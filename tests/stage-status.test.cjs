const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={participants:[],roundHistory:[],tournamentRounds:[],tournamentRoundNumber:2,roundNumber:1,gameConfig:{teamMode:false}};
const source=fs.readFileSync(require('node:path').join(__dirname,'../game.js'),'utf8');
vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('function getStageStatusData()'),source.indexOf('function renderStage()')),ctx);
const p=(id,key,n=3)=>({id,name:key,participantKey:key,equipment:Array(n).fill('item'),eliminated:false});
const normal=(id,result)=>({mode:'normal',results:{[id]:result}});
const msgs=who=>Array.from(ctx.getStageStatusMessages(who,ctx.getStageStatusData()));
ctx.participants=[p(7,'A'),p(8,'B')];ctx.tournamentRounds=[{tournamentRoundNumber:1,participants:[p(1,'A')],roundHistory:[normal(1,'win'),normal(1,'tie')]},{tournamentRoundNumber:2,participants:[p(7,'A')],roundHistory:[normal(7,'win')]},{tournamentRoundNumber:3,participants:[p(7,'A')],roundHistory:[normal(7,'loss')]}];
ctx.roundHistory=[normal(7,'tie'),normal(7,'win')];assert.deepEqual(msgs(ctx.participants[0]),['2連勝']);
ctx.roundHistory.push(normal(7,'loss'),normal(7,'tie'),normal(7,'loss'));assert.deepEqual(msgs(ctx.participants[0]),['2連敗']);
ctx.participants[0].name='renamed';assert.deepEqual(msgs(ctx.participants[0]),['2連敗']);
ctx.participants=[p(7,'A',1),p(8,'B',1)];ctx.roundHistory=[];ctx.tournamentRounds=[];
assert.deepEqual(msgs(ctx.participants[0]),['LAST，一把定江山','一敗未嘗']);
ctx.roundHistory=[normal(7,'win')];assert.deepEqual(msgs(ctx.participants[0]),['LAST，一把定江山','一敗未嘗']);
ctx.roundHistory=[normal(7,'tie')];assert.deepEqual(msgs(ctx.participants[0]),['LAST，一把定江山','一敗未嘗']);
ctx.roundHistory=[normal(7,'loss')];assert.deepEqual(msgs(ctx.participants[0]),['LAST，一把定江山']);
ctx.participants[1].equipment.push('item');assert.deepEqual(msgs(ctx.participants[0]),['LAST，一勝難求']);
ctx.roundHistory=[normal(7,'win')];assert.deepEqual(msgs(ctx.participants[0]),['LAST']);
ctx.participants=[p(7,'A')];ctx.roundHistory=[];assert.deepEqual(msgs(ctx.participants[0]),[]);
ctx.participants=[p(7,'A'),p(8,'B',0)];ctx.participants[1].eliminated=true;assert.deepEqual(msgs(ctx.participants[0]),[]);
ctx.gameConfig.teamMode=true;ctx.participants=[{...p(7,'A'),teamId:10},{...p(8,'B'),teamId:10},{...p(9,'C'),teamId:20}];
const team=(result,rep=7)=>({mode:'team',results:{10:result},representatives:{'team-10':rep}});
ctx.roundHistory=[team('win'),team('tie'),team('win',8)];
assert.deepEqual(msgs(ctx.participants[0]),['團隊2連勝']);assert.deepEqual(msgs(ctx.participants[1]),['團隊2連勝']);
ctx.roundHistory.push(team('win'));assert.deepEqual(msgs(ctx.participants[0]),['2連勝','團隊3連勝']);
ctx.tournamentRounds=[{tournamentRoundNumber:1,participants:[{...p(1,'A'),teamId:10}],roundHistory:[team('win',1)]}];
ctx.roundHistory=[team('win')];assert.deepEqual(msgs(ctx.participants[0]),['2連勝']);
ctx.roundHistory=[team('loss'),team('tie'),team('loss')];assert.deepEqual(msgs(ctx.participants[0]),['2連敗','團隊2連敗']);
ctx.participants[0].equipment=['item'];assert.deepEqual(msgs(ctx.participants[0]),['LAST，一勝難求','2連敗','團隊2連敗']);
console.log('PASS: tie skipping, cross-round identity/renaming, no snapshot duplication/future leakage, LAST and current-round stats, opponent conditions, team representatives and round boundary.');

// Opening hints use this round's initial clothing counts, including participants off stage.
ctx.gameConfig.teamMode=false;ctx.roundHistory=[];ctx.tournamentRounds=[];ctx.roundNumber=0;
ctx.participants=[p(1,'A',2),p(2,'B',4),p(3,'C',6)];
ctx.participants.forEach(who=>who.initialEquipment=[...who.equipment]);
assert.deepEqual(msgs(ctx.participants[0]),['劣勢開局']);
assert.deepEqual(msgs(ctx.participants[1]),['劣勢開局','優勢開局']);
assert.deepEqual(msgs(ctx.participants[2]),['優勢開局']);
ctx.participants=[p(1,'A',3),p(2,'B',4)];assert.deepEqual(msgs(ctx.participants[0]),[]);assert.deepEqual(msgs(ctx.participants[1]),[]);
ctx.participants=[p(1,'A',2),p(2,'B',4)];ctx.roundNumber=1;
assert.deepEqual(msgs(ctx.participants[0]),[]);assert.deepEqual(msgs(ctx.participants[1]),[]);
ctx.roundNumber=0;ctx.gameConfig.teamMode=true;
assert.deepEqual(msgs(ctx.participants[0]),['劣勢開局']);assert.deepEqual(msgs(ctx.participants[1]),['優勢開局']);
ctx.participants.forEach(who=>who.equipment=['item']);ctx.roundNumber=1;
assert.deepEqual(msgs(ctx.participants[0]),['LAST，一把定江山']);
ctx.participants.push({...p(3,'C',0),eliminated:true});
assert.deepEqual(msgs(ctx.participants[0]),['LAST，一勝難求']);
ctx.participants=[p(1,'A',1)];assert.deepEqual(msgs(ctx.participants[0]),['LAST，一勝難求']);
console.log('PASS: all-participant LAST priority, opening gap boundaries, initial-only timing and team mode.');

ctx.gameConfig.teamMode=false;ctx.roundNumber=1;ctx.tournamentRounds=[];ctx.participants=[p(1,'A'),p(2,'B')];
ctx.roundHistory=[normal(1,'tie'),normal(1,'tie')];assert.deepEqual(msgs(ctx.participants[0]),[]);
ctx.roundHistory.push(normal(1,'tie'));assert.deepEqual(msgs(ctx.participants[0]),['纏鬥中']);
ctx.roundHistory.push(normal(2,'win'),normal(1,'tie'));assert.deepEqual(msgs(ctx.participants[0]),['纏鬥中']);
for(const result of ['win','loss']){ctx.roundHistory=[normal(1,'tie'),normal(1,'tie'),normal(1,'tie'),normal(1,result)];assert.deepEqual(msgs(ctx.participants[0]),[]);}
ctx.tournamentRounds=[{tournamentRoundNumber:1,participants:[p(10,'A')],roundHistory:[normal(10,'tie'),normal(10,'tie')]}];
ctx.roundHistory=[normal(1,'tie')];assert.deepEqual(msgs(ctx.participants[0]),['纏鬥中']);
ctx.tournamentRounds=[];ctx.roundHistory=[normal(1,'win'),normal(1,'win'),normal(1,'tie'),normal(1,'tie'),normal(1,'tie')];
assert.deepEqual(msgs(ctx.participants[0]),['2連勝','纏鬥中']);
ctx.gameConfig.teamMode=true;ctx.roundHistory=[team('tie',1),team('tie',1),team('tie',1)];
assert.deepEqual(msgs(ctx.participants[0]),['纏鬥中']);assert.deepEqual(msgs(ctx.participants[1]),[]);
console.log('PASS: three-plus consecutive draws, decisive result reset, other-player inactivity, cross-round identity and coexistence with win streaks.');

// Priority: LAST variant, personal streak, draw streak, undefeated, team streak.
ctx.roundNumber=1;ctx.gameConfig.teamMode=true;ctx.participants=[{...p(1,'A',1),teamId:10},p(2,'B',3)];
ctx.tournamentRounds=[];ctx.roundHistory=[team('win',1),team('win',1),team('tie',1),team('tie',1),team('tie',1)];
assert.deepEqual(msgs(ctx.participants[0]),['LAST','2連勝','纏鬥中','團隊2連勝']);
ctx.gameConfig.teamMode=false;ctx.participants[1].equipment=['item'];
ctx.roundHistory=[normal(1,'win'),normal(1,'win'),normal(1,'tie'),normal(1,'tie'),normal(1,'tie')];
assert.deepEqual(msgs(ctx.participants[0]),['LAST，一把定江山','2連勝','纏鬥中','一敗未嘗']);
ctx.participants[0].equipment=['item','item'];
assert.deepEqual(msgs(ctx.participants[0]),['2連勝','纏鬥中','一敗未嘗']);
console.log('PASS: simultaneous hints ordered by LAST, personal streak/draws, undefeated, team streak.');

// Stage clothing hints share the animation's exposure rules and exclude penalties.
vm.runInContext(source.slice(source.indexOf('function getEquipmentPatternResults('),source.indexOf('function getAccumulatedEquipmentHistory(')),ctx);
ctx.getAccumulatedEquipmentHistory=who=>who.equipmentHistory || [];
const clothingStatus=(items,removed,penalties=[])=>ctx.getStageEquipmentStatus({equipment:items,equipmentHistory:removed.map(equipment=>({equipment})),penalties});
assert.equal(clothingStatus(['襪子'],[]),'');
assert.equal(clothingStatus(['襪子'],['胸罩','上衣']),'露奶');
assert.equal(clothingStatus(['襪子'],['內褲','褲子']),'露下體');
assert.equal(clothingStatus(['襪子'],['胸罩','內褲','洋裝']),'露奶；露下體');
assert.equal(clothingStatus([],['胸罩','內褲','洋裝']),'脫光全裸');
assert.equal(clothingStatus(['上衣'],[],['露奶','露下體','脫光全裸']),'');
assert.equal(ctx.getStageEquipmentStatus({}),'');
console.log('PASS: clothing hints, combined exposure, full undress priority and penalty exclusion.');

// Penalty badges appear only for final eliminated players, after settlement.
let pending=false,outcome=null;
ctx.hasPendingEquipment=()=>pending;
ctx.getRoundEndResult=()=>outcome;
ctx.headcountHandTransaction=null;
ctx.gameConfig={teamMode:false,eliminationPenalty:'  測試處罰  '};
const eliminated={id:1,name:'A',eliminated:true};
assert.equal(ctx.getStagePenalty(eliminated),'');
outcome={losers:['A']};
assert.equal(ctx.getStagePenalty(eliminated),'測試處罰');
assert.equal(ctx.getStagePenalty({...eliminated,eliminated:false}),'');
pending=true;assert.equal(ctx.getStagePenalty(eliminated),'');pending=false;
ctx.headcountHandTransaction={};assert.equal(ctx.getStagePenalty(eliminated),'');ctx.headcountHandTransaction=null;
ctx.gameConfig.manualSettlementState='pending';assert.equal(ctx.getStagePenalty(eliminated),'');
ctx.gameConfig.manualSettlementState='completed';assert.equal(ctx.getStagePenalty(eliminated),'測試處罰');
delete ctx.gameConfig.manualSettlementState;
ctx.gameConfig.teamMode=true;ctx.teams=[{id:10,eliminated:true}];
assert.equal(ctx.getStagePenalty({...eliminated,eliminated:false,teamId:10}),'測試處罰');
ctx.gameConfig.eliminationPenalty='  ';assert.equal(ctx.getStagePenalty(eliminated),'');

// Reveal replaces the button with literal text and survives stage rerendering.
ctx.gameConfig={teamMode:false,eliminationPenalty:'<b>測試處罰</b>'};
ctx.getParticipantDisplayName=p=>p.name;
const makeNode=(tag,text,className)=>({tag,textContent:text,className,children:[],listeners:{},
 appendChild(child){this.children.push(child);},replaceChildren(...children){this.children=children;},
 setAttribute(name,value){this[name]=value;},addEventListener(name,fn){this.listeners[name]=fn;},
 classList:{remove(){}}});
ctx.element=makeNode;
const caption=makeNode('figcaption');
const figure={querySelector:selector=>selector==='figcaption'?caption:null};
ctx.updateStagePenalty(figure,eliminated);
const holder=caption.children.at(-1),button=holder.children[0];
assert.equal(button.textContent,'罰');button.listeners.click();
assert.equal(holder.children[0].textContent,'<b>測試處罰</b>');
assert.equal(holder.children[0].tag,'span');
ctx.updateStagePenalty(figure,eliminated);
assert.equal(caption.children.at(-1).children[0].tag,'span');
outcome=null;ctx.updateStagePenalty(figure,eliminated);
outcome={};ctx.updateStagePenalty(figure,eliminated);
assert.equal(caption.children.at(-1).children[0].tag,'button');
console.log('PASS: final penalty gating, pending settlement, team elimination, safe text reveal and restart reset.');
