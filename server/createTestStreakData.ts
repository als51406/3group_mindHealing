// createTestStreakData.ts - 스트릭 테스트용 과거 대화 데이터 생성 스크립트
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';
const DB_NAME = process.env.DB_NAME || 'myapp_3g';

async function createTestStreakData() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('✅ MongoDB 연결 성공');
    
    const db = client.db(DB_NAME);
    
    // 사용자 ID 입력 받기 (첫 번째 사용자 찾기)
    const user = await db.collection('users').findOne();
    if (!user) {
      console.error('❌ 사용자를 찾을 수 없습니다. 먼저 회원가입을 해주세요.');
      return;
    }
    
    const userId = user._id.toString();
    console.log(`👤 사용자: ${user.email || userId}`);
    
    // 오늘부터 15일 전까지 연속 대화 생성 (2일 빠진 날도 추가하여 스트릭 변화 테스트)
    const today = new Date();
    const sessions: any[] = [];
    
    // 15일 연속 (오늘 포함)
    for (let i = 14; i >= 0; i--) {
      // 5일 전과 10일 전은 건너뛰기 (스트릭이 끊어지는 테스트)
      if (i === 5 || i === 10) {
        console.log(`⏭️  ${i}일 전 건너뛰기 (스트릭 테스트)`);
        continue;
      }
      
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(14, 0, 0, 0); // 오후 2시로 고정
      
      const dateStr = date.toISOString().split('T')[0];
      
      // 세션 생성
      const sessionId = new ObjectId();
      const session = {
        _id: sessionId,
        userId,
        date: dateStr,
        title: `테스트 대화 ${i}일 전`,
        type: 'ai',
        mood: {
          emotion: i % 3 === 0 ? '기쁨' : i % 3 === 1 ? '평온' : '희망',
          color: i % 3 === 0 ? '#FFE066' : i % 3 === 1 ? '#80E8D0' : '#AED581',
          intensity: 70 + (i % 3) * 10
        },
        preview: `${i}일 전 대화입니다.`,
        createdAt: date,
        lastUpdatedAt: date
      };
      
      sessions.push(session);
      
      // 메시지 생성
      const messages = [
        {
          _id: new ObjectId(),
          sessionId,
          role: 'user',
          content: `오늘은 ${i}일 전입니다. 테스트 메시지입니다.`,
          createdAt: date
        },
        {
          _id: new ObjectId(),
          sessionId,
          role: 'assistant',
          content: `네, ${i}일 전 대화를 기록합니다. 좋은 하루 보내세요! 😊`,
          createdAt: new Date(date.getTime() + 1000)
        }
      ];
      
      await db.collection('diary_session_messages').insertMany(messages);
      console.log(`✅ ${dateStr} (${i}일 전) 대화 생성`);
    }
    
    // 세션 일괄 저장
    if (sessions.length > 0) {
      await db.collection('diary_sessions').insertMany(sessions);
      console.log(`\n🎉 총 ${sessions.length}개의 테스트 대화가 생성되었습니다!`);
      console.log(`📊 예상 스트릭: 5일 (오늘부터 4일 전까지 연속)`);
      console.log(`📊 최장 스트릭: 5일`);
      console.log(`\n💡 5일 전과 10일 전 데이터를 건너뛰어서 스트릭이 끊어집니다.`);
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  } finally {
    await client.close();
    console.log('\n✅ MongoDB 연결 종료');
  }
}

// 실행
createTestStreakData();
