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
  String uid = request.getParameter("uid");
  String position = request.getParameter("position");
  String tel = request.getParameter("tel");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sqlupdate = "update uf_hrresource set position='"+position+"',tel='"+tel+"' where uid='"+uid+"'";
  int flag = statement.executeUpdate(sqlupdate);
  if(flag == 1){
    resultObj.put("msg","修改成功");
  }else{
    resultObj.put("msg","修改失败");
  }

  resultObj.put("code",0);
  out.print(resultObj);
  statement.close();
  connection.close();
%>
