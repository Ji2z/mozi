### 데이터 전처리

#### 라벨링 과정 : 기존 xml 형식의 라벨을 txt로 바꾼다.

xml 형식의 데이터를 txt로 바꿔주는 프로그램을 클론 해 온다.

```
git clone https://github.com/Isabek/XmlToTxt
pip install -r requirements.txt
```

그 후, xml폴더 안에 가지고 있던 xml 파일들을 넣는다.

classes.txt. 파일에 분류할 class들의 이름을 넣고 cls.txt.로 저장한다.

아래의 명령어를 XmlToTxt 폴더 아래에서 cmd를 이용해 실행한다.

```
python xmltotxt.py -c cls.txt -xml xml -out out
```

결과는 out 폴더에 저장된다.

