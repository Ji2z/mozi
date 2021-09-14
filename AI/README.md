## 데이터 전처리  	2021.09.07(화)

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

## 윈도우 환경에서 YOLO v3 설치 및 환경설정    2021.09.08(수)

> **Yolo Mark : https://github.com/AlexeyAB/Yolo_mark**
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
    <img src = "/uploads/d35b721a0227fe8906a3e018f685b540/sample.png" width="30%" height="30%">



<hr>

## YOLO v3 데이터 학습을 통한 weights 파일 만들기     2021.09.09(목)

- darknet-master\build\darknet\x64\data 구조

  ```
  |--data
  	|-- img
  		|-- 학습 이미지 및 라벨링 데이터 (ex> 1.jpg, 1.txt)
  	|-- darknet53.conv.74 (다운로드 경로 : pjreddie.com/media/files/darknet53.conv.74)
  	|-- obj.data
  	|-- obj.names
  	|-- train.txt
  ```



- obj.data : 설정

  ```
  classes= 112
  train  = data/train.txt
  valid  = data/train.txt
  names = data/obj.names
  backup = backup/
  ```

  

- obj.names : 라벨링 될 이름

  ```
  TOP 마스터라떼*캔
  TOP 스위트아메리카노*캔
  갈아만든 배*캔
  갈아만든 배*캔
  갈아만든 배*페트병
  갈아만든 배*페트병
  게토레이 블루볼트*페트병
  게토레이*캔
  게토레이 블루볼트*페트병
  게토레이*페트병
  ...
  ```



- train.txt : 학습할 이미지 경로

  ```
  data/img/10016_0_m_1.jpg
  data/img/10016_0_m_10.jpg
  data/img/10016_0_m_12.jpg
  data/img/10016_0_m_13.jpg
  data/img/10016_0_m_14.jpg
  data/img/10016_0_m_16.jpg
  ...
  ```



- yolov3.cfg 파일 수정 부분

  - batch=64

  - subdivisions=64

  - classes = 112

  - num = 3

  - filters = (112+5)*3 = 351

  - anchors = 106,219, 128,200,  89,299, 132,247, 109,317, 138,304, 126,388, 183,385, 242,391

    ```
    cmd 창에서 아래 명령어 입력 시 anchors 출력
    darknet.exe detector calc_anchors data/obj.data -num_of_clusters 9 -width 416 -height 416
    ```



- 학습 시작

  ```
  1. darknet-master/build/darknet/x64 에서 cmd 열기
  
  2. 아래의 명령어 입력
  	darknet.exe detector train data\obj.data testcfg\yolov3.cfg data\darknet53.conv.74  -gpu 0
  	
  2-1. 다시 학습을 이어갈 경우
  	darknet detector train data\obj.data testcfg\yolov3.cfg backup/______.weights -gpu 0
  ```

  - 결과 (진행중)
    - loss chart
    
      <img src = "/uploads/d6091af3999c1b7a0320aec2fd51dd45/1.PNG" width="40%" height="40%">
    
      <img src = "/uploads/51c994419f3b3d4ceae2d9fc7defa3b4/2.PNG" width="40%" height="40%">

<hr>

## 학습 가속화를 위한 방법 찾기     2021.09.10(금)

- 이미지 사이즈 조정
  - 2988 x 2988 -> 80 x 80
  - <img src = "/uploads/ec7c6aebf8ca48501b89ca04646c8963/30017_0_s_1.jpg" width="80px" height="80px">
- 클래스 개수 조절
  - classses = 112 	-> 	classes = 2
- 이미지 개수 조절
  - 12,765 개 	->	 115개
- 변경사항
  - 프론트엔드와 백엔드 통신 원활을 위한 Tensorflow.js 사용 계획
  - 이미지 사이즈 조절을 위한 label size및 bndbox 태그 값 수정
    - [resize_xml.ipynb](https://lab.ssafy.com/s05-ai-speech/S05P21A603/-/blob/develop/AI/%EC%86%8C%EC%8A%A4%EB%8D%B0%EC%9D%B4%ED%84%B0/resize_xml.ipynb)

<hr>

## TensorFlow.js 사용을 위한 환경설정 2021.09.14(화)

- Cuda Toolkit 11.2로 변경
- cudnn 3.8로 변경
- protoc 3.17.3 설치
- label에 xmax, xmin, ymax, ymin을 int형으로 변경
- label을 영어로 변경

<img src = "/uploads/3ba0a9f5a26158578f7dc6d0a3a13ee3/2.PNG" width="40%" height="40%">

<img src = "/uploads/246cdb85855fd66030195b90f4ea248f/1.PNG" width="40%" height="40%">
