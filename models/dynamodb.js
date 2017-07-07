const aws = require('aws-sdk');
const documentClient = new aws.DynamoDB.DocumentClient();

const Model = require("../index").Model;

class DynamoDB extends Model{
  constructor(tableName, schema, primaryKey){
    super(schema);
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }
  
  _save(params){
    const dbParams = {
      TableName : this.tableName,
      Item : params
    };
    return documentClient.put(dbParams).promise();
  }
  
  _delete(id){
    const dbParams = {
      TableName : this.tableName,
      Key : {}
    };
    dbParams[this.primaryKey] = id;
    return documentClient.delete(dbParams).promise();
  }
}