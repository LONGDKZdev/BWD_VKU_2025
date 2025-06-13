import { db } from "../../core/firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


const users = [
  {
    uid: "hyamImAblAbmT4lm486zIr4h61K2", // ✅ UID thật
    name: "Quoc Anh",
    email: "anhlvq.24itb@vku.udn.vn",
    avatar: "src/images/QuocAnh.jpg",
    phone: "0836729180",
    birthdate: "2006-08-19",
    gender: "male",
    createdAt: new Date().toISOString(),
    points: 312,
    streak: 7,
    followers: 150,
    postCount: 5,
    category: "fitness",
    rank: 10,
    achievements: [
      "Tham gia chiến dịch Huế chạy bộ 2024",
      "Hoàn thành 50km tháng 5"
    ],
    activity: {
      name: "Chạy bộ tháng 4",
      status: "Đã hoàn thành 15/30 ngày",
      progress: 50
    },
    // ✅ Thêm block mới
    progressBars: {
      chuoiNgay: 70,
      vanDong: 50,
      thienDinh: 50
    }
  },
  {
    uid: "6nNdYaCjICeTeMK2s7fhOBlkeDd2", // ✅ UID thật
    name: "Võ Huy Long",
    email: "vohuylong12393@gmail.com",
    avatar: "src/images/HuyLong.jpg",
    phone: "0783237727",
    birthdate: "2006-09-16",
    gender: "male",
    createdAt: new Date().toISOString(),
    points: 200,
    streak: 30,
    followers: 170,
    postCount: 8,
    category: "fitness",
    rank: 12,
    achievements: [
      "Tham gia chiến dịch Huế chạy bộ 2023",
      "Hoàn thành 10km tháng 7"
    ],
      activity: {
    name: "Chạy bộ tháng 6",
    status: "Đã hoàn thành 15/30 ngày",
    progress: 50
  },
  progressBars: {
    chuoiNgay: 40,
    vanDong: 40,
    thienDinh: 40
  }
  },
  {
    uid: "VVa0MD7reBXzAlD82CqgQsqzZYz1", // ✅ UID thật
    name: "longDKZ",
    email: "vng123987xd@gmail.com",
    avatar: "src/images/default-avatar.jpg",
    phone: "0836729180",
    birthdate: "2006-08-19",
    gender: "male",
    createdAt: new Date().toISOString(),
    points: 0,
    streak: 0,
    followers: 0,
    postCount: 0,
    category: "fitness",
    rank: 13,
    achievements: [
    ],
    activity: {
    },
    progressBars: {
      chuoiNgay: 0,
      vanDong: 0,
      thienDinh: 0
    }
  }
];

export async function importUsers() {
  try {
    for (const user of users) {
      const { uid, ...profile } = user;
      await setDoc(doc(db, "users", uid), profile);
      console.log(`✅ Đã import user với uid: ${uid}`);
    }
    console.log("🎉 Import hoàn tất!");
  } catch (error) {
    console.error("❌ Lỗi import:", error.message);
  }
}

importUsers();
