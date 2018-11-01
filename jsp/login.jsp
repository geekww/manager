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
  String password = request.getParameter("password");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql="select * from uf_hrresource where uid='"+uid+"'";
  ResultSet rs = statement.executeQuery(sql);
  if(rs.next()) {
    if(password.equals(rs.getString("password"))){
      resultObj.put("code","1");
      resultObj.put("msg","登录成功");
    }else{
      resultObj.put("code","0");
      resultObj.put("msg","密码错误");
    }

    // row.put("id",rs.getString("id"));
    // row.put("name",rs.getString("name"));
    // row.put("password",rs.getString("password"));
    // data.add(row);
  }else{
    resultObj.put("code","0");
    resultObj.put("msg","用户不存在");
  }
  resultObj.put("data",data);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
