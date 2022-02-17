# prac_blog

## 콜랙션 설계

### 게시글
#### id
#### title : string
#### author : string
#### content: string
#### dateTime : date
####
### 댓글
#### id 
#### author : string
#### content : string
#### dateTime : date

## api 설계
###
### 전체 게시글 목록 조회
#### 요청 : get 
#### 경로 : /post
### 게시글 작성
#### 요청 : post 
#### 경로 : /post
### 게시글 상세 조회
#### 요청 : get 
#### 경로 : /post/:postId
### 게시글 수정
#### 요청 : patch 
#### 경로 : /post/:postId
### 게시글 삭제
#### 요청 : delete 
#### 경로 : /post/:postId
#### 
### 게시글 내 댓글 목록 조회
#### 요청 : get  
#### 경로 : /post/:postId/coments
### 댓글 작성
#### 요청 : post
#### 경로 : /post/:postId/coments
### 댓글 수정
#### 요청 : patch  
#### 경로 : /coments/:comentsId
### 댓글 삭제
#### 요청 : delete  
#### 경로 : /coments/:comentsId
