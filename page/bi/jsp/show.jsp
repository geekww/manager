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

  String uid = request.getParameter("uid");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

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

  String sqltask = "select * from uf_task t1,uf_hrresource t2 where t2.uid='"+uid+"' and t2.name=t1.fzr and t1.state <>'完成' order by t1.planefinish";
  ResultSet rstask = statement.executeQuery(sqltask);
  while(rstask.next()) {
    row.put("task",rstask.getString("task"));
    row.put("planefinish",rstask.getString("planefinish"));
    row.put("state",rstask.getString("state"));
    data.add(row);
  }

  resultObj.put("code",0);
  resultObj.put("task",data);
  out.print(resultObj);

  statement.close();
  connection.close();
%>
