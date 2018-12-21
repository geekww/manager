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
  JSONArray data = new JSONArray();

  String sql="select * from uf_teamkey";
  ResultSet rs = statement.executeQuery(sql);
  while(rs.next()) {
    String pname = rs.getString("pname");
    String sqldev = "select * from uf_team where pname="+pname;
    ResultSet rsdev = statement.executeQuery(sqldev);
    while(rsdev.next()){
        row.put("pname",rsdev.getString("pname"));
        row.put("dev",rsdev.getString("dev"));
        row.put("duty",rsdev.getString("duty"));
        row.put("detail",rsdev.getString("detail"));
        data.add(row);
    }
  }
  resultObj.put("code",0);
  resultObj.put("data",data);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
