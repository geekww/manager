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
  String uid = request.getParameter("uid");
  String sex = request.getParameter("sex");
  String tel = request.getParameter("tel");
  String position = request.getParameter("position");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql="select * from uf_hrresource where uid='"+uid+"'";
  ResultSet rs = statement.executeQuery(sql);
  if(rs.next()) {
    resultObj.put("msg","工号已存在");
  }else{
    String sqlinsert = "insert into uf_hrresource (name,uid,sex,tel,position) values ('"+name+"','"+uid+"','"+sex+"','"+tel+"','"+position+"')";
    int flag = statement.executeUpdate(sqlinsert);
    if(flag == 1){
      resultObj.put("msg","添加成功");
    }else{
      resultObj.put("msg","添加失败");
    }
  }
  resultObj.put("code",0);
  resultObj.put("data",data);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
