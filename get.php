<meta http-equiv="Content-Type" content="text/html; charset=windows-874">
<meta http-equiv="Content-Language" content="th">
<meta http-equiv="Program" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="cache-control" content="max-age=0">
<?php

	function getCookie($array){
		foreach($array as $index => $value){
			if(substr($value,0,10) =='Set-Cookie')return substr(trim(substr($value,11)),0,-7);		
		}		
	}
	function randomJSESSION(){
		return ('0000'.randomString(23).':-1');
	}
	
	function randomString($no){
   	 $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
   	 $randstring = '';
	    for ($i = 0; $i < 23; $i++) 
	        {
	            $randstring .= $characters[rand(0, strlen($characters))];
	        }
	        return $randstring;
    }

	$postdata = http_build_query(
		    array(
		        'studentid' => $_GET['id'], //$userName
		        'submit.x' => '37', 
		        'submit.y'=> '7'
		    )
		);	
			
		$cookie='';
	    $url='http://www.reg.chula.ac.th/servlet/com.dtm.chula.admission.servlet.InquiryGraduatedStudentServlet';
	      $opts = array(
			'http'=>array(
		    'method'=>"POST",
		    'header'=>
		    	 "Connection: keep-alive\r\n".
		    	 "Cache-Control: max-age=0\r\n".
		    	 "Origin: https://www.reg.chula.ac.th\r\n".
		    	 "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4\r\n".
		    	 "Content-Type: application/x-www-form-urlencoded\r\n".
		    	 "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n".
		    	 "Referer: https://www.reg.chula.ac.th/cu/reg/logon/logonPage.html\r\n".
		    	 "Accept-Language: en-US,en;q=0.8\r\n".
		    	 "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3\r\n".
		    	 "Cookie: cresist=Iivt1@Ivt@Iyzp1@Ivt1; _cbclose=1; _cbclose20108=1; _uid20108=EEFFD162.3; verify=test; drillmenu1=7; JSESSIONID=".randomJSESSION()."\r\n",
		    	 'content' => $postdata
		     )
		);
		
		$context = stream_context_create($opts);
	    $file = file_get_contents($url, false, $context);
		$cookie= getCookie($http_response_header);	
		echo $file;

?>