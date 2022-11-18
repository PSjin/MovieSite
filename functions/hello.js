exports.handler = async function (event, context){
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'PARKELE',
      age: 85,
      email: 'parkele1@naver.com'
    })
  }
}