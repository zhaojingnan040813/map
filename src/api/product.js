import request from './request'

const APPLICATION_ID = 'b4a84eb9ba424344ae2018bfac4a315b'
const FORM_HEAD_UUID = 'eaf95b27a34d491f86130bd714b740d6'

export function getProductList(params = {}) {
  const { page = 1, pagesize = 8, sortid = '', isasc = '', filters = [] } = params
  return request.post('/appsheets/sheetapi/getFormList', {
    applicationid: APPLICATION_ID,
    formheaduuid: FORM_HEAD_UUID,
    needpage: 1,
    page,
    pagesize,
    sortid,
    isasc,
    filters
  })
}

export function getProductById(id) {
  return request.post('/appsheets/sheetapi/getFormList', {
    applicationid: APPLICATION_ID,
    formheaduuid: FORM_HEAD_UUID,
    needpage: 0,
    page: 1,
    pagesize: 1,
    filters: [{ key: 'id', value: id }]
  })
}