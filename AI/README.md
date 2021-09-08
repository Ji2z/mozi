## 데이터 전처리

#### 라벨링 과정 : 기존 xml 형식의 라벨을 txt로 바꾼다.

xml 형식의 데이터를 txt로 바꿔주는 프로그램을 클론 해 온다.

```
git clone https://github.com/Isabek/XmlToTxt
pip install -r requirements.txt
```

그 후, xml폴더 안에 가지고 있던 xml 파일들을 넣는다.

classes.txt. 파일에 분류할 class들의 이름을 넣고 [cls.txt](https://lab.ssafy.com/s05-ai-speech/S05P21A603/-/blob/develop/AI/%EC%86%8C%EC%8A%A4%EB%8D%B0%EC%9D%B4%ED%84%B0/classes.txt)로 저장한다. 

아래의 명령어를 XmlToTxt 폴더 아래에서 cmd를 이용해 실행한다.

```
python xmltotxt.py -c cls.txt -xml xml -out out
```

결과는 [out](https://lab.ssafy.com/s05-ai-speech/S05P21A603/-/blob/develop/AI/%EC%86%8C%EC%8A%A4%EB%8D%B0%EC%9D%B4%ED%84%B0/label.zip) 폴더에 저장된다.



<hr>

## 윈도우 환경에서 YOLO v3 설치 및 환경설정

> ### Yolo Mark : https://github.com/AlexeyAB/Yolo_mark
>
> **darknet : https://github.com/AlexeyAB/darknet**

- **환경설정**
  - 개발 환경
    - Windows 10 Enterprise
    - opencv 3.4.8
    - cuda 10.1
    - cudnn 10.1
    - Visual Studio 2017
  - 참고 자료
    - https://junsik-hwang.tistory.com/43?category=819242
    - https://ctkim.tistory.com/81
  - Compute Capability : 7.5 (NVIDIA GeForce RTX 2060)
    - 자신에게 맞는 숫자 확인하기 : https://developer.nvidia.com/cuda-gpus#compute
    - 프로젝트 > 속성 > CUDA C/C++ > Code Generation > **`compute_75,sm_75`** 적용
  - 결과 : weight 파일을 만들 수 있는 darknet.exe 트레이닝 프로그램 생성
    - 내장된 demo 파일 **`darknet_web_cam_voc.cmd`** 실행
    - ![컵 결과](/capture/sample.png)

