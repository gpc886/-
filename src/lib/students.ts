// 学生姓名库
export const STUDENTS = [
  '张伟', '李娜', '王芳', '刘洋', '陈静', '杨帆', '赵敏', '黄磊',
  '周杰', '吴梅', '徐涛', '孙丽', '马强', '朱红', '胡伟', '郭秀',
  '林峰', '何萍', '高山', '罗兰', '郑磊', '梁芳', '谢阳', '宋杰',
  '唐丽', '许刚', '韩梅', '冯强', '邓红', '曹磊', '彭芳', '曾强',
  '肖丽', '田伟', '董梅', '袁强', '潘红', '于磊', '蔡芳', '蒋伟',
  '余丽', '杜磊', '叶芳', '程强', '魏红', '苏伟', '吕芳', '丁强',
  '任丽', '沈伟', '姚芳', '卢强', '姜红', '钟伟', '崔芳', '谭强',
  '范丽', '金伟', '夏芳', '汪强', '钱红', '侯伟', '戴芳', '严强',
  '柳丽', '史伟', '龚芳', '顾强', '邵红', '秦伟', '岳芳', '傅强',
  '邱丽', '孟伟', '孔芳', '白强', '尹红', '欧阳伟', '贺芳', '龚强'
];

// 随机抽取一个学生
export const drawOneStudent = (): string => {
  const randomIndex = Math.floor(Math.random() * STUDENTS.length);
  return STUDENTS[randomIndex];
};

// 随机抽取两个不同的学生
export const drawTwoStudents = (): [string, string] => {
  const shuffled = [...STUDENTS].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};
