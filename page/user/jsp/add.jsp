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
  String age = request.getParameter("age");
  String tel = request.getParameter("tel");
  String department = request.getParameter("department");
  String addr = request.getParameter("addr");

  JSONObject resultObj = new JSONObject();
  JSONObject row = new JSONObject();
  JSONArray data = new JSONArray();

  String sql="select * from uf_hrresource where uid='"+uid+"'";
  ResultSet rs = statement.executeQuery(sql);
  if(rs.next()) {
    resultObj.put("msg","工号已存在");
  }else{
    String sqlinsert="insert into uf_hrresource (name,uid,sex,age,tel,department,addr) value ("+name+","+uid+","+sex+","+age+","+tel+","+department+","+addr+")";
    int flag = statement.executeUpdate(sqlinsert);
    resultObj.put("msg",flag);
  }
  resultObj.put("code",0);
  out.print(resultObj);

  rs.close();
  statement.close();
  connection.close();
%>
