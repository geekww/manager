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
  String department = request.getParameter("department");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql="select t1.departid,t1.departname,t1.date,t1.bz,count(*) as total from uf_department t1,uf_hrresource t2 where t1.departid = t2.department";
  ResultSet rs = statement.executeQuery(sql);
  while(rs.next()) {
    row.put("departid",rs.getString("departid"));
    row.put("departname",rs.getString("departname"));
    row.put("total",rs.getString("total"));
    row.put("date",rs.getString("date"));
    row.put("bz",rs.getString("bz"));
    data.add(row);
  }

  resultObj.put("code",0);
  resultObj.put("data",data);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
