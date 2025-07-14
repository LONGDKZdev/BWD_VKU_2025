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
    uid: "R0k1nFMFn5fACUSUTiPDkYla5rv1", // ✅ UID thật
    name: "Võ Huy Long",
    email: "longvh.24itb@vku.udn.vn",
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
    uid: "NQ72dDBOHtOGLcEPbMJuxQZbUm52",
    name: "Ngọc Huyền",
    email: "huyendttn.24itb@vku.udn.vn",
    avatar: "src/images/Ngochuyen.jpg",
    phone: "0941736020",
    birthdate: "2006-11-03",
    gender: "female",
    createdAt: new Date().toISOString(),
    points: 400,
    streak: 8,
    followers: 180,
    postCount: 9,
    category: "fitness",
    achievements: [
      "Tham gia chiến dịch Đà Nẵng chạy bộ 2024",
      "Hoàn thành 30km tháng 5",
      "Tham gia chiến dịch chạy bộ tháng cộng đồng 2025",
    ],
    activity: {
      name: "Chạy bộ tháng 8",
      status: "Đã hoàn thành 20/30 ngày",
      progress: 50,
  progressBars: {
    chuoiNgay: 80,
    vanDong: 90,
    thienDinh: 90
    }
  }
},
{
  uid: "LznJJxJqI0RPgwYgpOtZi0eTjRi2",
  name: "Thanh Hải",
    email: "haivt.24itb@vku.udn.vn",
    avatar: "src/images/ThanhHai.jpg",
    phone: "0905654321",
    birthdate: "2006-01-02",
    gender: "male",
    createdAt: new Date().toISOString(),
    points: 123,
    streak: 7,
    followers: 250,
    postCount: 6,
    category: "fitness",
    achievements: [
      "Tham gia chiến dịch Đà Nẵng marathon 2024",
      "Hoàn thành 90km tháng 6"
    ],
    activity: {
      name: "Chạy bộ tháng 5",
      status: "Đã hoàn thành 12/30 ngày",
      progress: 50
    },
progressBars: {
  chuoiNgay: 80,
  vanDong: 90,
  thienDinh: 90
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
