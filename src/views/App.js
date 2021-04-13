import { Input, Form, Button, message } from "antd";
import React, { useState, useEffect } from "react";
let apickLine = 0;
let apickNum = 0;
let bpickLine = 0;
let bpickNum = 0;
export default function App() {
    const [winner, setWinner] = useState(undefined); //

    const [turn, setTurn] = useState("A"); //

    const [dataSource, setDataSource] = useState({ 1: 3, 2: 5, 3: 7 }); //火柴数据结构

    const validateInput = (line, num) => {
        if (line > Object.keys(dataSource).length || line < 0) {
            message.error("请选择正确的火柴行");
            return false;
        }
        if (num > dataSource[line]) {
            message.error("选择的火柴数不能大于该行火柴总数");
            return false;
        }
        if (num < 0) {
            message.error("选择的火柴数不能小于0");
            return false;
        }
        if (dataSource[line] == num) {
            delete dataSource[line];
        } else {
            dataSource[line] = dataSource[line] - num;
        }
        return true;
    };

    const aplayerConfirm = () => {
        const flag = validateInput(apickLine, apickNum);
        if (flag) {
            const keys = Object.keys(dataSource);
            if (keys.length == 1 && dataSource[keys[0]] == 1) {
                setWinner("A");
            } else {
                setDataSource(Object.assign(dataSource, {}));
            }
            setTurn("B");
        }
    };

    const bPlayerConfirm = () => {
        const flag = validateInput(bpickLine, bpickNum);
        if (flag) {
            const keys = Object.keys(dataSource);
            if (keys.length == 1 && dataSource[keys[0]] == 1) {
                setWinner("B");
            } else {
                setDataSource(Object.assign(dataSource, {}));
            }
            setTurn("A");
        }
    };

    const turnA = turn == "A";
    return (
        <div>
            <h1>趣味游戏</h1>
            <p>
                如右下图15根牙签 分成三行 每行自上而下（其实方向不限）分别是3、5、7根
                A和B，每人可以在一轮内，在任意行拿任意根牙签，但不能跨行 拿最后一根牙签的人即为输家
            </p>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 0.7 }}>
                    <div className="player">
                        {turnA ? <span style={{ color: "lightblue" }}>></span> : null}
                        <span>A</span>
                        <Input
                            max={Object.keys(dataSource).length}
                            placeholder="请选择行数"
                            disabled={!turnA || winner}
                            type={"number"}
                            style={{ width: 120 }}
                            onChange={(e) => {
                                apickLine = Number(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="请选择取走火柴数"
                            disabled={!turnA || winner}
                            type={"number"}
                            style={{ width: 150 }}
                            onChange={(e) => {
                                apickNum = Number(e.target.value);
                            }}
                        />
                        <Button disabled={!turnA || winner} onClick={aplayerConfirm}>
                            确定
                        </Button>
                    </div>

                    <div className="player">
                        {!turnA ? <span style={{ color: "lightblue" }}>></span> : null}

                        <span>B</span>
                        <Input
                            max={Object.keys(dataSource).length}
                            placeholder="请选择行数"
                            disabled={turnA || winner}
                            type={"number"}
                            style={{ width: 120 }}
                            onChange={(e) => {
                                bpickLine = Number(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="请选择取走火柴数"
                            type={"number"}
                            style={{ width: 150 }}
                            disabled={turnA || winner}
                            onChange={(e) => {
                                bpickNum = Number(e.target.value);
                            }}
                        />
                        <Button disabled={turnA || winner} onClick={bPlayerConfirm}>
                            确定
                        </Button>
                    </div>
                </div>

                <div
                    style={{
                        flex: 0.3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {Object.keys(dataSource).map((key) => {
                        const num = dataSource[key];
                        const content = Array(num).fill("__").join(" ");
                        return <div>{content}</div>;
                    })}
                </div>
            </div>

            {winner ? <div className="result"> {`${winner}获胜了`}</div> : null}
        </div>
    );
}
