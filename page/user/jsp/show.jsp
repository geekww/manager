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

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql="select * from uf_hrresource t1,uf_department t2 where t1.department=t2.departid and uid='"+name+"'";
  ResultSet rs = statement.executeQuery(sql);
  while(rs.next()) {
    row.put("uid",rs.getString("uid"));
    row.put("name",rs.getString("name"));
    row.put("sex",rs.getString("sex"));
    row.put("age",rs.getString("age"));
    row.put("tel",rs.getString("tel"));
    row.put("addr",rs.getString("addr"));
    row.put("departname",rs.getString("departname"));
    data.add(row);
  }
  resultObj.put("code",0);
  resultObj.put("data",data);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
