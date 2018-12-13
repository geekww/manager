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

  String sqltotal="select count(*) as total from uf_task";
  ResultSet rstotal = statement.executeQuery(sqltotal);
  if(rstotal.next()) {
    resultObj.put("total",rstotal.getString("total"));
  }

  String sqlfinish="select count(*) as finish from uf_task where state='完成' or state='关闭'";
  ResultSet rsfinish = statement.executeQuery(sqlfinish);
  if(rsfinish.next()) {
    resultObj.put("finish",rsfinish.getString("finish"));
  }

  String sqldelay="select count(*) as delay from uf_task where date > planefinish and state='完成' or state='关闭'";
  ResultSet rsdelay = statement.executeQuery(sqldelay);
  if(rsdelay.next()) {
    resultObj.put("delay",rsdelay.getString("delay"));
  }

  resultObj.put("code",0);
  out.print(resultObj);

  statement.close();
  connection.close();
%>
