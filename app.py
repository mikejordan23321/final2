from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

# 宝藏提示和分支的结局
hints = {
    "forest": ["树叶间的光芒在闪烁", "古老的树根似乎在指引方向"],
    "beach": ["潮汐声越来越大", "脚下的沙子好像隐藏了什么"],
    "mountain": ["山顶有一块岩石呈现出奇怪的形状", "冷风吹过，似乎在传达什么秘密"]
}

endings = {
    "forest": ["找到了一颗珍珠般的宝石！", "碰到一只神秘的动物，但它逃走了"],
    "beach": ["发现了一枚古老的金币", "找到了一片罕见的贝壳"],
    "mountain": ["在山顶找到了一块稀有矿石", "听到了回声，但似乎什么都没有"]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_hint', methods=['POST'])
def get_hint():
    choice = request.json.get("choice")
    hint = random.choice(hints[choice])
    return jsonify({"hint": hint})

@app.route('/get_ending', methods=['POST'])
def get_ending():
    choice = request.json.get("choice")
    ending = random.choice(endings[choice])
    return jsonify({"ending": ending})

if __name__ == '__main__':
    app.run(debug=True)
