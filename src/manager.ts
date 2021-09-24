//Classes for the Affair Manager.
//@author Emmett Storey
export {AffairManager as AffairManager}
//Affair Mangaer Class
class AffairManager{
    private members:Array<Member>=[];
    private affairs:Array<Affair>=[];
    private organizations:Array<Organization>=[];
    private search(query:string,array:Array<any>):any[]|undefined
{
    var result:any[]= array.filter(function(array:any):boolean{
        if(array.getName()==query)
            return true;
        else 
            return false;
        });
        return result;
}
constructor(){
    this.members= [];
    this.affairs= [];
    this.organizations=[];
}
    addMember(name:string, email:string){
        this.members.push(new Member(name,email));
    }
findMemberNames(query:string):string[]{
  var temp:Member[] =this.search(query, this.members);
  return temp.map(function(tempMember:Member):string{
   return tempMember.getName();
  },this.members);

}
getMembers(affairName:string):string[]{
var temp:Affair[]=this.search(affairName,this.affairs);
if(temp!==undefined){
var tempM:Member[]=temp[0].getMembers();
return tempM.map(function(m:Member){
 return (m.getName()+" Email:"+m.getEmail())
},tempM)}}
addAffair(name:string,zip:string,date:string):void{ 

this.affairs.push(new Affair(name, zip, date));
}

findAffairNames(query:string):string[]{
    var temp:Affair[] =this.search(query, this.affairs);
    return temp.map(function(tempA:Affair):string{
     return tempA.getName();
    },this.affairs);
}
modifyAffair(affairName:string, newTitle?:string|undefined, newTime?:string):void{
  var tempAffair:Affair[]=  this.search(affairName, this.affairs);
  if(newTitle!=undefined){
  this.affairs.forEach(function(affair:Affair){
    if(affairName==affair.getName())
    affair.setName(newTitle)},this.affairs)}
  if(newTitle!=undefined){
  this.affairs.forEach(function(affair:Affair){
      if(affairName==affair.getName())
      affair.setDate(newTime)
  },this.affairs)}

}
addOrganization(organizationName:string):void{
this.organizations.push(new Organization(organizationName));
}
findOrganizationNames(query:string):string[]{
    var temp:Organization[] =this.search(query, this.affairs);
    return temp.map(function(tempO:Organization):string{
     return tempO.getName();
    },this.organizations);    
}
addMemberToAffair(memberName:string, affairName:string){
var tempAffair:Affair[]=this.search(affairName,this.affairs);
var temp:Member[]=this.search(memberName,this.members);
tempAffair[0].pushMembers(temp[0])
}
addAffairToOrganization(affairName:string, organizationName:string):void{
var temp:Affair[]=this.search(affairName,this.affairs);
this.organizations.forEach(function(tempO:Organization){
    if(organizationName==tempO.getName()){
        tempO.addAffair(temp[0]);
    }
},this.organizations)
}







}
class Member{

   private name:string;
   private email:string;
   constructor(name:string, email:string){
       this.name=name;
       this.email=email;
   }
   getName():string{
       return this.name;
   }
   getEmail():string{
       return this.email;
   }
}
class Affair{
private name:string;
private zip:string;
private date:string;
private members:Member[];
constructor(name:string, zip:string, date:string){
    this.name=name;
    this.zip=zip;
    this.date=date;
    this.members=[];
    return;
}    
setName(name:string){
    this.name=name;
}
getName():string{
    return this.name;
}
setZip(zip:string){
    this.zip=zip;
}
getZip():string{
    return this.zip;
}
setDate(date:string){
    this.date=date;
}
getDate():string{
    return this.date;
}
pushMembers(member:Member):void{
   if(this.members.map(function(tempM:Member):boolean{
        return (member.getName()== tempM.getName());
    },this.members))
    this.members.push(member);
}
getMembers():Member[]{
    return this.members;
}
}
class Organization{
    private name:string;
   private affairs:Affair[];
    constructor(name:string){
        this.name=name;
        this.affairs=[];
        return;
    }
    getName():string{
        return this.name;
    }
    addAffair(affair:Affair):void{
        if(this.affairs.map(function(tempA:Affair):boolean{
            return (affair.getName()== tempA.getName());
        },this.affairs))
        this.affairs.push(affair);
    }
}

