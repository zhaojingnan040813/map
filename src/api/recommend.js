import request from './request'
const APPLICATION_ID = 'b4a84eb9ba424344ae2018bfac4a315b'
const FORM_HEAD_UUID = '32a0e346c76c11f090090242ac17000a'

export function getRecommendList(params = {}) {
  const {
    page = 1,
    pagesize = 4,
    sortid = '',
    isasc = '',
    filters = []
  } = params

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

export function getRecommendById(id) {
  return request.post('/appsheets/sheetapi/getFormList', {
    applicationid: APPLICATION_ID,
    formheaduuid: FORM_HEAD_UUID,
    needpage: 0,
    page: 1,
    pagesize: 1,
    filters: [{ key: 'id', value: id }]
  })
}
