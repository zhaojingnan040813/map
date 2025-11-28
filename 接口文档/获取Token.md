---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

Base URLs:

# Authentication

# Default

## POST 获取Token

POST /api/appsheets/sheetapi/getUToken

获取Token

> Body 请求参数

```yaml
applicationid: ""
appkey: ""
appsecret: ""
username: ""

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |张佳鹏的token|
|body|body|object| 否 |none|
|» applicationid|body|string| 否 |none|
|» appkey|body|string| 否 |none|
|» appsecret|body|string| 否 |none|
|» username|body|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "status": "success",
  "result": {
    "id": 330,
    "name": "张佳鹏",
    "phone": "18372153466",
    "tel": "18372153466",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzOSIsImp0aSI6ImM1NjFhOTNkNDVjZjk3NDRmMTg0ZTIzMTEyNDQ4ZmNhMzc4MjY5ZGQ5YTBhMDg3YThhZDc1OTc4ODAxOTgzZDAzMTU5MWU4NzBiNmUyMjg4IiwiaWF0IjoxNzY0MjE1MzM2LjM3NjUxOSwibmJmIjoxNzY0MjE1MzM2LjM3NjUyMSwiZXhwIjoxNzY0ODIwMTM2LjM3NTc2LCJzdWIiOiIzMzAiLCJzY29wZXMiOlsicGxhdGZvcm0iXX0.XCwNa6G4Pc6ZJE5285mkjov94QN0f4X8QIuqO_gIP9yECdoYPkgsLM-EcCPW5Le2Z_wpbVdr9IjxU45rxHxC4RoIcNsQbInnzn9chmssW0gWSxlkCmj2K2N0X9N23ATp68I0Fu5JFV_hH6Xn8355MFCQOh6U51wT4upbRvSCkyNgjLW23zjqu_rly9aQawO-1NKg0Apx_PD29u9tp0t0InBev15UQd_rtL-3VOQ9gRtw0kFpMHsgf_BwkPXGPZgogDpX4-_8dL7-lInju6sgjQHmpgRQH4vO0GG1K6teOKSRod1f9M2y7HVNUV96s3eiwgcKCYN7ZEGOgRMcHhDqVMXFj9bZDDpC-cDcuDQsRfzgRCU4p-sOnmFfcMaxh7bWdl3bdEejoBWULLXswmu_SyGGomThtbwixueWeXVGtDwuLYUkC2mOlDzDWRrak8H849HwLX_R2nJPaBY_OWKnMKRObnoTGvs2sks6bQtwSXk3tY1R90FI_sONYAnPiXXhr5YrvwX6ClRbKsEdn2t307fVl1U2Xt0A3DbtOIo1-5j9bCthfr1Lm-5XXzUVHFUqJpd1vx3TTwz3LJ7dsLawd8eoczUMb6_J92t6PNjHqKPQIEhVUK8jo96yT27VgZ18iuZmqExhc5el60iZiETavLf-dXPV-Fy4n-3v-CrxH94",
    "is_superuser": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» status|string|true|none||none|
|» result|object|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» phone|string|true|none||none|
|»» tel|string|true|none||none|
|»» token|string|true|none||none|
|»» is_superuser|integer|true|none||none|

# 数据模型

