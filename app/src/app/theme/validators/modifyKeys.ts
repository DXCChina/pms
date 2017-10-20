export class objectKeys{
  public static modify(obj){
    return obj.map(ele=>{
      let keys = Object.keys(ele);
      return {name:ele[keys[0]],id:ele[keys[1]],info:ele[keys[2]]};
    });
  }
}
