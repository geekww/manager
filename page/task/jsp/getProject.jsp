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
  JSONObject row = new JSONObject();
  JSONObject rowhr = new JSONObject();
  JSONArray data = new JSONArray();
  JSONArray datahr = new JSONArray();
  // 查询项目
  String sql="select * from uf_project order by pid";
  ResultSet rs = statement.executeQuery(sql);
  while(rs.next()) {
    row.put("pid",rs.getString("pid"));
    row.put("pname",rs.getString("pname"));
    data.add(row);
  }
  // 查询人员
  String sqlhr="select * from uf_hrresource where uid <> 'admin' order by uid";
  ResultSet rshr = statement.executeQuery(sqlhr);
  while(rshr.next()) {
    rowhr.put("uid",rshr.getString("uid"));
    rowhr.put("name",rshr.getString("name"));
    datahr.add(rowhr);
  }
  resultObj.put("code",0);
  resultObj.put("data",data);
  resultObj.put("datahr",datahr);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
