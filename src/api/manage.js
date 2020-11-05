import request from '@/utils/request'

const api = {
  customer: '/customer',
  follow: '/follow',
  dictionary: '/dictionary/type',
  department: '/department',
  activity: '/activity',
  // -----------------------
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

// 数据字典
export function getDictionaryList (parameter) {
  return request({
    url: api.dictionary,
    method: 'get',
    params: parameter
  })
}
export function addDictionaryType (parameter) {
  return request({
    url: api.dictionary,
    method: 'post',
    params: parameter
  })
}
export function updateDictionaryType (parameter) {
  return request({
    url: api.dictionary,
    method: 'put',
    params: parameter
  })
}

export function deleteDictionaryType (parameter) {
  return request({
    url: api.dictionary,
    method: 'delete',
    params: parameter
  })
}

export function getCustomerList (parameter) {
  return request({
    url: api.customer,
    method: 'get',
    params: parameter
  })
}
export function getFollowList (parameter) {
  return request({
    url: api.follow,
    method: 'get',
    params: parameter
  })
}

export function getDepartmentList (parameter) {
  return request({
    url: api.department,
    method: 'get',
    params: parameter
  })
}
export function getActivityList (parameter) {
  return request({
    url: api.activity,
    method: 'get',
    params: parameter
  })
}
// --------------------

export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function saveSub (sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub
  })
}
