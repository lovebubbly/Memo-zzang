from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
memos = []

app = FastAPI()


class memo(BaseModel):
    id: str
    content: str


@app.post("/memos")
def create_memo(memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다.'


app.mount("/", StaticFiles(directory="static", html=True), name="static")
