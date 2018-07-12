package com.meetingroom;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.meetingroom.pojo.GooglePojo;

@Controller
public class Actuator {
	
	@RequestMapping(value="/OAuth2CallBack",method=RequestMethod.GET)
	public String googleOAuth(ModelMap model, HttpServletRequest req, HttpServletResponse res) {
		try {
			res.setContentType("text/html");
			// Get Code from the Parameter
			String code = req.getParameter("code");
			
			//Format Parameter to POST
			String urlParameters = "code=" 
					+ code
					+ "&client_id=920111247627-bttq3tqcgbpp4deuske0ae29h68tsi95.apps.googleusercontent.com"
					+ "&client_secret=uaplDnYxMvPWrsfrcdM4qOuk"
					+ "&redirect_uri=https://setmoreinternship.appspot.com/OAuth2CallBack"
					+ "&grant_type=authorization_code";
			
			URL url = new URL("https://accounts.google.com/o/oauth2/token");
			URLConnection urlConn = url.openConnection();
			urlConn.setDoOutput(true);
			OutputStreamWriter writer = new OutputStreamWriter(urlConn.getOutputStream());
			writer.write(urlParameters);
			writer.flush();
			
			// Get Output in Output String
			String line, outputString = "";
			BufferedReader reader = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));
			while( (line = reader.readLine()) != null)
				outputString += line;
			//System.out.println("Output String : " + outputString);
			
			// Access Token
			JsonObject json = (JsonObject) new JsonParser().parse(outputString);
			String access_token = json.get("access_token").getAsString();
			//System.out.println("Access Token : " + access_token);
			
			//User Info
			url = new URL("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token);
			urlConn = url.openConnection();
			outputString = "";
			reader = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));
			while( (line = reader.readLine()) != null)
				outputString += line;
			//System.out.println("Output String : " + outputString);
			
			// JSON response
			GooglePojo data = new Gson().fromJson(outputString, GooglePojo.class);
			
			// Model Map
			model.addAttribute("id", data.getId());
			model.addAttribute("name", data.getName());
			model.addAttribute("email", data.getEmail());
			model.addAttribute("verified", data.isVerified_email());
			model.addAttribute("family_name", data.getFamily_name());
			model.addAttribute("link", data.getLink());
			model.addAttribute("picture", data.getPicture());
			
			res.getWriter().println(model);
			//RequestDispatcher reqd = req.getRequestDispatcher("BookingPage");
			//reqd.forward(req, res);
			writer.close();
			reader.close();
		//} catch (ServletException e) {
		//	e.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "AdminPage";
	}
}