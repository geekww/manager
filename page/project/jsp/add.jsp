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
  String pid = request.getParameter("pid");
  String pname = request.getParameter("pname");
  String manager = request.getParameter("manager");
  String date = request.getParameter("date");
  String dsc = request.getParameter("dsc");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql = "select * from uf_project where pid='"+pid+"'";
  String sqlinsert = "insert into uf_project (pid,pname,manager,date,dsc) values ('"+pid+"','"+pname+"','"+manager+"','"+date+"','"+dsc+"')";

  ResultSet rs = statement.executeQuery(sql);
  if(rs.next()) {
    resultObj.put("msg","该编号已使用");
  }else{
    int flag = statement.executeUpdate(sqlinsert);
    if(flag == 1){
      resultObj.put("msg","添加成功");
    }else{
      resultObj.put("msg","添加失败");
    }
  }

  out.print(resultObj);
  rs.close();
  statement.close();
  connection.close();
%>
