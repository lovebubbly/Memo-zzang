from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
memos = []

app = FastAPI()


class memo(BaseModel):
    id: str
    content: str


@app.post("/memos")
def create_memo(memo_data: memo):
    memos.append(memo_data)
    return '메모 추가에 성공했습니다.'


@app.get("/memos")
def read_memo():
    return memos


@app.put("/memos/{id}")
def put_memo(memo_req: memo):
    for m in memos:
        if m.id == memo_req.id:
            m.content = memo_req.content
            return '메모 수정에 성공했습니다.'
    return '메모 수정에 실패했습니다.'


@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: str):  # memo_id를 str로 받아옴
    for index, m in enumerate(memos):
        if m.id == memo_id:  # id만 비교
            memos.pop(index)  # 해당 인덱스의 메모 삭제
            return '메모 삭제에 성공했습니다.'
    return '메모 삭제에 실패했습니다.'


app.mount("/", StaticFiles(directory="static", html=True), name="static")
