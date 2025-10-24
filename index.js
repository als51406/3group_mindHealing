import OpenAI from "openai";

// Open AI API Key
const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true
});

// html로부터 id 가져오기
const chatLog = document.getElementById("chatLog");
const form = document.getElementById("form");
const chat = document.getElementById("chat");

// 채팅 박스에서 Enter를 쳤을 때
form.addEventListener("submit", (event) => {

    // 페이지 새로 고침 하지 않기
    event.preventDefault();

    // 만약 input이 비어있다면 진행 X
    if (!chat.value) return;

    // 사용자 메시지 임시 저장
    const userMessage = chat.value;

    // 채팅 UI 비우기
    chat.value = "";

    // # 사용자 채팅 로그 생성 -시작- -------------------------------------------
    // 채팅 로그에 넣을 새로운 li 태그 생성하기
    const li = document.createElement("li");

    // li 태그에 사용자가 말한 내용 넣기
    li.textContent = userMessage;

    // 새로 만든 li를 채팅 로그에 추가
    chatLog.appendChild(li);
    // # 사용자 채팅 로그 생성 -끝- ---------------------------------------------

    (async () => {
        try {
            // OpenAI API 호출
            const response = await openai.chat.completions.create({

                // 사용할 모델
                model: "gpt-3.5-turbo",

                messages: [
                    // 시스템 메시지: AI에게 역할 지시
                    {
                        role: "system",
                        content: `
                        너에게 3가지 역할을 줄께

                        1️⃣ 현재 사용자의 감정에 가장 어울리는 색상을 사용자에게 알려주고,
                        사용자의 감정에 따라 조언이나 위로 혹은 응원도 해줬으면 좋겠어.

                        2️⃣ 다정하고 친근하게 말해줘!
                        
                        3️⃣ (사용자가 볼 수 없게) 대화의 끝에 현재 사용자의 감정에 가장 어울리는 색상을 JSON으로 출력해 줘.
                        만약 사용자의 대화에 감정과 관련이 없다면 생략해도 돼.
                        JSON은 이렇게 출력하면 돼!
                        {"color": "#ffffff"}
                        `
                    },
                    // 사용자 메시지: 실제로 분석할 텍스트
                    { role: "user", content: userMessage }
                ]
            });

            // AI 메시지 받기
            let aiMessage = response.choices[0].message.content;

            // # AI 메시지에 포함된 json 추출 및 사용 -시작- -------------------------------
            // jsonMatch: AI 메시지에 포함된 json들
            const jsonMatch = aiMessage.match(/\{[^}]+\}/)

            // 만약 AI 메시지에서 json이 포함되어 있다면
            if (jsonMatch) {

                // AI 메시지에서 json 추출 시도
                const json = JSON.parse(jsonMatch[0]);

                // json에 color 속성이 있을 때
                if (json.color) {

                    // 배경색을 json의 color 깂으로 변경
                    document.body.style.backgroundColor = json.color;
                }

                // AI 메시지에서 json을 제거하기 + 제거하고 남은 빈 칸 제거
                aiMessage = aiMessage.replace(jsonMatch[0], "").trim();
            }
            // # AI 메시지에 포함된 json 추출 및 사용 -끝- ---------------------------------

            // # AI 메시지 채팅 로그 생성 -시작- -------------------------------------------
            // 채팅 로그에 넣을 새로운 li 태그 생성하기
            const li = document.createElement("li");

            // li 태그에 사용자가 말한 내용 넣기
            li.textContent = aiMessage;

            // 새로 만든 li를 채팅 로그에 추가
            chatLog.appendChild(li);
            // # AI 메시지 채팅 로그 생성 -끝- ---------------------------------------------

        } catch (error) {

            // 오류 발생 시 콘솔에 출력 + 화면에 표시
            console.error(error);
            const li = document.createElement("li");
            li.textContent = "오류"
            chatLog.appendChild(li);
        }
    })();
});