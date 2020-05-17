const resources = {
  files: 'files',
  details: 'details',
  todos: 'todos',
  chatGroup: 'chat_group',
  members: 'member',
}

const access = {
  all: '*',
  read: 'read',
  update: 'update',
  create: 'create'
}

class ACL{
  constructor(){
    this.access = access;
    this.resources = resources;
  }
  getAccess(){
    return this.access;
  }
  getResources(){
    return this.resources;
  }
  /** Examples:
   * @param userACL takes in permission
   * @example [ { files: '*', details: '*', todos: '*', chatGroup: '*' } ]
   * **/

  validateAccess(resource, targetAccess ,userACL){
    const permission = userACL['permissions'][0];
    let valid = false;
    if(permission[resource] === access.all || permission[resource] === access[targetAccess]){
      valid = true
    }
    return valid;
  }
}


class Admin{
  constructor(){
    this.roles = {}
    Object.keys(resources).map(res =>{
      this.roles[res] = access.all
    })
  }

  getAccessList(){
    return this.roles
  }
}



/** Singleton Instance**/
const AdminInstance = (function(){
  let instance = null;

  return (function(){
    if(!instance){
      instance = new Admin();
    }
    return instance;
  })()

})();

const ACLInstance = (function(){
  let instance = null;

  return (function(){
    if(!instance){
      instance = new ACL();
    }
    return instance;
  })();

})();


exports.acl = ACLInstance;
exports.admin = AdminInstance;

