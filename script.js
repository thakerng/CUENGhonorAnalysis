	var Fhonor=new Array();
	var Fthonor=new Array();
	var Shonor=new Array();
	var Sthonor=new Array();
	var Nhonor=new Array();
	var Nthonor=new Array();
	var firstPlace='เกียรตินิยมอันดับหนึ่ง';
	var secondPlace='เกียรตินิยมอันดับสอง';
	var fc=0,sc=0,nc=0,all=0,nul=0,tfc=0,tsc=0,tnc=0,tall=0,tnull=0;

	function query(id,max){
				jQuery.ajax({
					url:'get.php',
					dataType:'html',
					data:{id:id},
					type:'GET',
					success:function(data){
						all++;
						if(id.substring(0,4)=='5231')tall++;
						var result;
						var name=$(data).find('table#Table2 tr').get(2);
						if(!name){
							nul++;
							if(id.substring(0,4)=='5231')tnull++;
							$('table tbody').append("<tr><td>"+id+"</td><td>ยังไม่จำแนก</td></tr>");
							return;}
						name=$(name).find('td font').get(1).innerHTML;
						var grade=$(data).find('table#Table2 tr').get(5);
						grade=$(grade).find('td font').get(1).innerHTML;
						
						if(grade==firstPlace){
							fc++;
							var facult=$(data).find('table#Table2 tr').get(6);
							facult=$(facult).find('td font').get(1).innerHTML;
							if(id.substring(0,4)=='5231'){tfc++; if(Fthonor[facult]==undefined){Fthonor[facult]=1;}else Fthonor[facult]++;}
							if(Fhonor[facult]==undefined){Fhonor[facult]=1;}else Fhonor[facult]++;
							$('table tbody').append("<tr><td>"+id+"</td> <td>"+name+"</td> <td>"+firstPlace+"</td><td>"+facult+"</td></tr>");							
						}
						else if(grade==secondPlace){
							sc++;
							var facult=$(data).find('table#Table2 tr').get(6);
							facult=$(facult).find('td font').get(1).innerHTML;
							if(id.substring(0,4)=='5231'){tsc++;if(!Sthonor[facult])Sthonor[facult]=1;else Sthonor[facult]++;}							
							if(!Shonor[facult])Shonor[facult]=1;else Shonor[facult]++;
							$('table tbody').append("<tr><td>"+id+"</td> <td>"+name+"</td> <td>"+secondPlace+"</td><td> "+facult+"</td></tr>");
						}
						else {
							nc++;
							var facult=$(data).find('table#Table2 tr').get(5);
							facult=$(facult).find('td font').get(1).innerHTML;
							if(id.substring(0,4)=='5231'){tnc++;if(!Nthonor[facult])Nthonor[facult]=1;else Nthonor[facult]++;}
							if(!Nhonor[facult])Nhonor[facult]=1;else Nhonor[facult]++;
							$('table tbody').append("<tr><td>"+id+"</td> <td>"+name+"</td> <td>ปกติ</td><td> "+facult+"</td></tr>");
						 }
						 update();
					}
				});	
		 }			

		 function update(){
		 	var str='<p>Summary <br>';		 
		 	str+=' First: '+fc+' ('+tfc+'+'+(fc-tfc)+')';
		 	str+=' Second: '+sc+' ('+tsc+'+'+(sc-tsc)+')';	 	
		 	str+=' Normal: '+nc+' ('+tnc+'+'+(nc-tnc)+')';
		 	str+=' Waiting: '+nul+' ('+tnull+'+'+(nul-tnull)+')';
		 	str+=' All: '+all;
		 	str+='<br></p>';
		 	$('.result').html(str);
		 	var resy='';
				for(i in Fhonor){
					var t=(Fthonor[i]==undefined)?0:Fthonor[i];
					resy+="ภาค "+i+" มีเกียรตินิยมอันดับหนึ่งจำนวน "+Fhonor[i]+" ("+t+"+"+(Fhonor[i]-t)+")"+" คน<br>";
				}
				for(i in Shonor){
					var t=(Sthonor[i]==undefined)?0:Sthonor[i];
					resy+="ภาค "+i+" มีเกียรตินิยมอันดับสองจำนวน "+Shonor[i]+" ("+t+"+"+(Shonor[i]-t)+")"+" คน<br>";
				}
				for(i in Nhonor){
					var t=(Nthonor[i]==undefined)?0:Nthonor[i];
					resy+="ภาค "+i+" จบแบบปกติ "+Nhonor[i]+" ("+t+"+"+(Nhonor[i]-t)+")"+" คน<br>";
				}
				$('.show').html(resy+"<br>");
		 }

		//Recursive Delay Request
		function request(i,max){
			setTimeout(function(){

				if(i==max)return;
				query(list[i]);
				request(++i,max);
			},300);
		}
		//Main method
		function main(){				
				request(0,list.length);			
		}

		jQuery(document).ready(function(){
			main();		
		}); 