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

  //获取页面参数
  String room = request.getParameter("room");
  String date = request.getParameter("date");
  String time = request.getParameter("time");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql="select * from uf_orderroom where room='"+room+"' and date='"+date+"' and time='"+time+"'";
  ResultSet rs = statement.executeQuery(sql);
  if(rs.next()) {
    resultObj.put("msg","该时间段已被预订");
    // row.put("room",rs.getString("room"));
    // row.put("time",rs.getString("time"));
    // row.put("department",rs.getString("department"));
    // row.put("user",rs.getString("user"));
    // data.add(row);
  }else{
    resultObj.put("msg","预订成功");
  }
  resultObj.put("sql",sql);
  resultObj.put("code",0);
  resultObj.put("data",data);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
