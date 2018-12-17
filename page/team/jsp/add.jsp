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
  String name = request.getParameter("name");
  String manager = request.getParameter("manager");
  String pagedev = request.getParameter("page");
  String backdev = request.getParameter("back");
  String testdev = request.getParameter("test");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sqlinsert = "insert into uf_team (name,manager,pagedev,backdev,testdev) values ('"+name+"','"+manager+"','"+pagedev+"','"+backdev+"','"+testdev+"')";
  int flag = statement.executeUpdate(sqlinsert);
  if(flag == 1){
    resultObj.put("msg","添加成功");
  }else{
    resultObj.put("msg","添加失败");
  }
  resultObj.put("code",0);
  resultObj.put("data",data);
  out.print(resultObj);

  statement.close();
  connection.close();
%>
