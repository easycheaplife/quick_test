
/*
 * reference : http://stackoverflow.com/questions/3732109/simple-http-server-in-java-using-only-java-se-api
 * curl -XPOST http://localhost:8000/test -d '{"hpid":"131","hosName":"煤炭总医院","ksid":"200001246","departName":"耳鼻喉科","haoid":"33968568","sfz":"140702199311237033","date":"2016-03-11","source":"3","regMobile":"15811101970","duty":"主任医师","thirdPartyId":"adaece54-4dac-35fe-8e20-6791657830a9","authCode":"248787","loginToken":"ghLogin-72ef7a39764a043e5b884e32ee70f104","personalityElementStr":"&hospitalcardid=&medicarecardid=&reimbursementtype="}'
 * run:
 * javac -cp freeSubmitRegister.jar   Test.java
 * java -cp freeSubmitRegister.jar: Test
*/
import java.net.URLEncoder;
import java.util.Date;
import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.net.InetSocketAddress;
import com.alibaba.fastjson.JSON;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.youyi.freeregister.FreeSubmitRegist;

public class Test {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(9876), 0);
        server.createContext("/test", new MyHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
    }

    static class MyHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String method = t.getRequestMethod();
            System.out.println(method);

            InputStream input = t.getRequestBody();
            int available = input.available();
            byte[] data = new byte[1024];
            input.read(data, 0, available);
            String context = new String(data, "UTF-8");
			/*
            String test = "{\"hpid\":\"131\",\"hosName\":\"煤炭总医院\",\"ksid\":\"200001246\",\"departName\":\"耳鼻喉科\",\"haoid\":\"33968568\",\"sfz\":\"140702199311237033\",\"date\":\"2016-03-11\",\"source\":\"3\",\"regMobile\":\"15811101970\",\"duty\":\"主任医师\",\"thirdPartyId\":\"adaece54-4dac-35fe-8e20-6791657830a9\",\"authCode\":\"248787\",\"loginToken\":\"ghLogin-72ef7a39764a043e5b884e32ee70f104\",\"personalityElementStr\":\"&hospitalcardid=&medicarecardid=&reimbursementtype=\"}";
            SubmitRegisterUrlBean submitRegisterUrlBean = new SubmitRegisterUrlBean();
            try {
                submitRegisterUrlBean = JSON.parseObject(context, SubmitRegisterUrlBean.class);
                System.out.println(submitRegisterUrlBean.getHosName());
            } catch (Exception e) {
                e.printStackTrace();
            }
            String json = FreeSubmitRegist.submitFreeRegister(submitRegisterUrlBean.getHpid(),submitRegisterUrlBean.getHosName(),
                    submitRegisterUrlBean.getKsid(), submitRegisterUrlBean.getDepartName(), submitRegisterUrlBean.getHaoid(), submitRegisterUrlBean.getSfz(),
                    submitRegisterUrlBean.getDate(), submitRegisterUrlBean.getRegMobile(), submitRegisterUrlBean.getDuty(),
                    submitRegisterUrlBean.getThirdPartyId(), submitRegisterUrlBean.getAuthCode(),
                    submitRegisterUrlBean.getLoginToken());
			*/
			Date date = new Date();  
			String result = FreeSubmitRegist.submitFreeRegister(context);
			System.out.println(date); 
			System.out.println(context); 
			System.out.println(result);
            String response = "This is the response";
			result = URLEncoder.encode(result,"utf-8");
            t.sendResponseHeaders(200, result.length());
            OutputStream output = t.getResponseBody();
            output.write(result.getBytes());
            output.close();
			t.setStreams(null,output);
			t.close();
        }
    }

}
