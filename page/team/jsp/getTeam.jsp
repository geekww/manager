<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.lang.*"%>
<%@ page import="com.mysql.jdbc.Driver"%>
<%@ page import="net.sf.json.JSONObject"%>
<%@ page import="net.sf.json.JSONArray"%>
<%@ page import="java.sql.*" %>
<%
  //连接数据库
  String url="jdbc:mysql://127.0.0.1/manager?user=root&password=root";
  Class.forName("com.mysql.jdbc.Driver").newInstance();
  Connection connection=DriverManager.getConnection(url);
  Statement statement = connection.createStatement();

  JSONObject resultObj = new JSONObject();
  JSONObject rowpname = new JSONObject();
  JSONObject rowmanager = new JSONObject();
  JSONObject rowpage = new JSONObject();
  JSONObject rowback = new JSONObject();
  JSONObject rowtest = new JSONObject();

  JSONArray datapname = new JSONArray();
  JSONArray datamanager = new JSONArray();
  JSONArray datapage = new JSONArray();
  JSONArray databack = new JSONArray();
  JSONArray datatest = new JSONArray();

  // 查询人员
  String sqlpname="select * from uf_project";
  String sqlmanager="select * from uf_hrresource where position='项目经理'";
  String sqlpage="select * from uf_hrresource where position='前端开发工程师'";
  String sqlback="select * from uf_hrresource where position='后端开发工程师'";
  String sqltest="select * from uf_hrresource where position='测试工程师'";

  ResultSet rspname = statement.executeQuery(sqlpname);
  while(rspname.next()) {
    rowpname.put("pid",rspname.getString("pid"));
    rowpname.put("pname",rspname.getString("pname"));
    rowpname.put("manager",rspname.getString("manager"));
    datapname.add(rowpname);
  }
  ResultSet rsmanager = statement.executeQuery(sqlmanager);
  while(rsmanager.next()) {
    rowmanager.put("uid",rsmanager.getString("uid"));
    rowmanager.put("name",rsmanager.getString("name"));
    datamanager.add(rowmanager);
  }
  ResultSet rspage = statement.executeQuery(sqlpage);
  while(rspage.next()) {
    rowpage.put("uid",rspage.getString("uid"));
    rowpage.put("name",rspage.getString("name"));
    datapage.add(rowpage);
  }
  ResultSet rsback = statement.executeQuery(sqlback);
  while(rsback.next()) {
    rowback.put("uid",rsback.getString("uid"));
    rowback.put("name",rsback.getString("name"));
    databack.add(rowback);
  }
  ResultSet rstest = statement.executeQuery(sqltest);
  while(rstest.next()) {
    rowtest.put("uid",rstest.getString("uid"));
    rowtest.put("name",rstest.getString("name"));
    datatest.add(rowtest);
  }

  resultObj.put("code",0);
  resultObj.put("pname",datapname);
  resultObj.put("manager",datamanager);
  resultObj.put("page",datapage);
  resultObj.put("back",databack);
  resultObj.put("test",datatest);
  out.print(resultObj);

  statement.close();
  connection.close();
%>
