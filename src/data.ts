export interface College {
    id: string;
    name: string;
    location: string;
    logo: string;
    courses: number;
    students: number;
    tags: string[];
    description: string;
    coursesOffered: string[];
}

export interface Course {
    id: string;
    name: string;
    instructor: string;
    category: string;
    students: number;
    files: number;
    schedule: string;
    isEnrolled: boolean;
    description: string;
}

export const SAMPLE_COLLEGES: College[] = [
    { id: 'iitb', name: 'Indian Institute of Technology, Bombay', location: 'Mumbai, Maharashtra', logo: '0A2540/FFFFFF?text=IITB', courses: 12, students: 500, tags: ['engineering', 'research'], description: 'IIT Bombay is a public technical university located in Powai, Mumbai. It is a world-renowned institution for engineering education and research, consistently ranked among the top engineering colleges in India.', coursesOffered: ['PHYS101', 'CS202', 'MATH301', 'CHEM210', 'LIT205'] },
    { id: 'du', name: 'Delhi University', location: 'New Delhi, Delhi', logo: '800000/FFFFFF?text=DU', courses: 25, students: 1200, tags: ['arts', 'commerce', 'science'], description: 'The University of Delhi is a collegiate public central university located in New Delhi. It is one of the largest universities in India, offering a wide range of courses across various disciplines, and is highly regarded for its arts and commerce programs.', coursesOffered: ['LIT205', 'ECO101', 'HIST220', 'PSYCH100', 'PHIL201'] },
    { id: 'vit', name: 'Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', logo: 'FFBF00/000000?text=VIT', courses: 18, students: 900, tags: ['engineering', 'technology'], description: 'Vellore Institute of Technology is a private research university located in Vellore, Tamil Nadu. It is known for its engineering and management programs, with a strong focus on practical and industry-relevant education.', coursesOffered: ['CS202', 'MATH301', 'PHYS101', 'DSGN110'] },
    { id: 'iisc', name: 'Indian Institute of Science', location: 'Bengaluru, Karnataka', logo: '006400/FFFFFF?text=IISc', courses: 10, students: 300, tags: ['research', 'science'], description: 'The Indian Institute of Science (IISc) is a public university for scientific research and higher education located in Bengaluru. It is one of the most prestigious academic institutions in India, renowned for its cutting-edge research and doctoral programs.', coursesOffered: ['BIO101', 'CHEM210', 'PHYS101', 'MATH301'] },
    { id: 'anna', name: 'Anna University', location: 'Chennai, Tamil Nadu', logo: '4682B4/FFFFFF?text=AnnaU', courses: 22, students: 1000, tags: ['engineering', 'state_university'], description: 'Anna University is a public state university located in Chennai, Tamil Nadu, India. It is a premier institution for technical education, offering various engineering and technology courses, and has a large student body.', coursesOffered: ['CS202', 'PHYS101', 'ECO101', 'DSGN110'] },
    { id: 'nift', name: 'National Institute of Fashion Technology', location: 'New Delhi, Delhi', logo: 'E11079/FFFFFF?text=NIFT', courses: 8, students: 400, tags: ['design', 'fashion'], description: 'NIFT is a group of fashion colleges in India. It is a leader in fashion education and research, known for fostering creativity and innovation in the fashion industry.', coursesOffered: ['DSGN110', 'LIT205'] },
];

export const SAMPLE_COURSES: Course[] = [
    { id: 'PHYS101', name: 'Classical Mechanics', instructor: 'Dr. Evelyn Reed', category: 'Physics', students: 45, files: 23, schedule: 'Mon, Wed 10AM', isEnrolled: true, description: 'Fundamental principles of classical mechanics, including Newtonian mechanics, Lagrangian and Hamiltonian formalisms. This course provides a deep dive into the motion of objects and systems under forces.' },
    { id: 'CS202', name: 'Data Structures', instructor: 'Prof. Alan Turing', category: 'CompSci', students: 60, files: 40, schedule: 'Tue, Thu 2PM', isEnrolled: true, description: 'Introduction to common data structures like arrays, linked lists, trees, graphs, and their implementations and analysis. Essential for efficient algorithm design and problem-solving in computer science.' },
    { id: 'MATH301', name: 'Linear Algebra', instructor: 'Dr. Ada Lovelace', category: 'Math', students: 50, files: 15, schedule: 'Fri 11AM', isEnrolled: false, description: 'Concepts of vector spaces, linear transformations, matrices, determinants, eigenvalues, and eigenvectors. Crucial for various fields including engineering, computer graphics, and machine learning.' },
    { id: 'LIT205', name: 'Modern Literature', instructor: 'Dr. Virginia Woolf', category: 'Literature', students: 35, files: 18, schedule: 'Mon, Fri 1PM', isEnrolled: false, description: 'Exploration of literary movements and key authors from the 20th century to the present, examining themes of identity, society, and human condition.' },
    { id: 'ECO101', name: 'Principles of Economics', instructor: 'Prof. John M. Keynes', category: 'Economics', students: 55, files: 20, schedule: 'Tue, Thu 9AM', isEnrolled: true, description: 'Basic principles of microeconomics and macroeconomics, including supply and demand, market structures, and economic policy. Provides a foundation for understanding economic behavior and systems.' },
    { id: 'DSGN110', name: 'Intro to Graphic Design', instructor: 'Ms. Paula Scher', category: 'Design', students: 40, files: 25, schedule: 'Wed 2PM - 5PM', isEnrolled: false, description: 'Foundations of graphic design, covering principles of visual communication, typography, and image-making. Develop skills in visual problem-solving and creative expression.' },
    { id: 'HIST220', name: 'World History: 1500-Present', instructor: 'Dr. Howard Zinn', category: 'History', students: 42, files: 22, schedule: 'Mon, Wed 3PM', isEnrolled: false, description: 'Survey of major global historical developments from the Age of Exploration to contemporary times. Explores political, social, and cultural transformations that shaped the modern world.' },
    { id: 'BIO101', name: 'Introduction to Biology', instructor: 'Dr. Jane Goodall', category: 'Biology', students: 65, files: 30, schedule: 'Tue, Thu 11AM', isEnrolled: true, description: 'Overview of fundamental biological concepts, including cell structure, genetics, evolution, and ecology. Provides a broad understanding of living systems and their interactions.' },
    { id: 'CHEM210', name: 'Organic Chemistry I', instructor: 'Prof. Marie Curie', category: 'Chemistry', students: 48, files: 28, schedule: 'Mon, Wed, Fri 9AM', isEnrolled: false, description: 'Introduction to the structure, properties, and reactions of organic compounds. Essential for understanding the chemistry of living organisms and many industrial processes.' },
    { id: 'PSYCH100', name: 'Introduction to Psychology', instructor: 'Dr. Sigmund Freud', category: 'Psychology', students: 70, files: 15, schedule: 'Tue 1PM - 4PM', isEnrolled: false, description: 'Fundamental concepts, theories, and research methods in psychology, covering major subfields like cognitive, developmental, and social psychology.' },
    { id: 'PHIL201', name: 'Ethics & Moral Philosophy', instructor: 'Prof. Plato', category: 'Philosophy', students: 30, files: 12, schedule: 'Thu 3PM - 6PM', isEnrolled: false, description: 'Examination of major ethical theories and their application to moral dilemmas, fostering critical thinking about moral reasoning and decision-making.' }
];

export const SAMPLE_RECENT_ACTIVITY = [
    { type: 'pdf', title: 'New PDF: "PHYS101_Lecture_Notes_Week5.pdf"', source: 'Classical Mechanics', author: 'Dr. Reed', time: '2 hours ago', icon: 'file-text' },
    { type: 'comment', title: 'Alice W. replied to your comment', source: 'CS202 Project Group', details: '"That\'s a great idea, let\'s try..."', time: '5 hours ago', icon: 'message-square' },
    { type: 'announcement', title: 'Announcement: Midterm Schedule', source: 'University Updates', time: 'Yesterday', icon: 'megaphone' },
];

export const SAMPLE_CHATS = [
    { id: 'chat1', name: 'PHYS101 Group', type: 'group', lastMessage: "Dr. Reed: Don't forget the assignment due...", time: '10:30 AM', unread: 3, avatarSeed: 'PG', online: true },
    { id: 'chat2', name: 'Alice Wonderland', type: 'user', lastMessage: "Sure, I can help with that! Let's meet...", time: 'Yesterday', unread: 0, avatarSeed: 'AW', online: false },
    { id: 'chat3', name: 'CS202 Project Team', type: 'group', lastMessage: "Prof. Turing: Remember the deadline!", time: 'Mon', unread: 1, avatarSeed: 'CS', online: true },
];

export const SAMPLE_NOTIFICATIONS = [
    { id: 'notif1', type: 'announcement', title: 'New Exam Dates Released', description: 'Check the academic calendar for updated exam schedules. All departments.', source: 'University Portal', time: 'Just now', icon: 'megaphone', isRead: false },
    { id: 'notif2', type: 'comment', title: 'Prof. Turing commented on your assignment', description: 'Feedback received for "Binary Tree Implementation" on CS202. Review your grade and comments.', source: 'CS202', time: '5 minutes ago', icon: 'message-square', isRead: false },
    { id: 'notif3', type: 'file', title: 'New Lecture Notes for BIO101', description: 'Chapter 7: Cellular Respiration notes have been uploaded. Prepare for next lecture.', source: 'Introduction to Biology', time: '1 hour ago', icon: 'file-text', isRead: true },
    { id: 'notif4', type: 'system', title: 'Your profile has been updated.', description: 'Your academic information was successfully synchronized.', source: 'Account', time: '2 hours ago', icon: 'info', isRead: false },
    { id: 'notif5', type: 'announcement', title: 'Holiday Declared on Friday', description: 'The university will be closed on June 20th for a public holiday.', source: 'Campus Admin', time: 'Yesterday', icon: 'calendar', isRead: true }
];

export const USER_PROFILE = {
    name: 'Sunny S.',
    university: 'IIT Bombay',
    major: 'B.Tech Computer Science & Engineering'
};

export const SAMPLE_UPLOADED_FILES = [
    { id: 'f1', name: 'Research Paper on AI.pdf', size: '2.5 MB', type: 'pdf', uploaded: '2 days ago' },
    { id: 'f2', name: 'Course Outline CS202.docx', size: '0.8 MB', type: 'doc', uploaded: '1 week ago' },
    { id: 'f3', name: 'Project Idea Sketch.png', size: '1.1 MB', type: 'img', uploaded: '3 days ago' }
];

export const SAMPLE_EVENTS = [
    { id: 'e1', title: 'Tech Symposium 2026', date: 'Feb 15, 2026', time: '10:00 AM', location: 'Main Auditorium', type: 'event', category: 'Tech' },
    { id: 'e2', title: 'Physics Midterm Exam', date: 'Feb 12, 2026', time: '02:00 PM', location: 'Hall A', type: 'deadline', category: 'Academic' },
    { id: 'e3', title: 'AI Workshop', date: 'Feb 18, 2026', time: '04:00 PM', location: 'Lab 4', type: 'event', category: 'Workshop' },
    { id: 'e4', title: 'Library Book Return', date: 'Feb 10, 2026', time: '05:00 PM', location: 'Central Library', type: 'deadline', category: 'Admin' },
];

export const SAMPLE_MATERIALS = [
    { id: 'm1', title: 'Quantum Mechanics Notes', subject: 'Physics', type: 'PDF', size: '4.2 MB', downloads: 125 },
    { id: 'm2', title: 'Data Structures Cheat Sheet', subject: 'CompSci', type: 'Image', size: '1.5 MB', downloads: 340 },
    { id: 'm3', title: 'Previous Year Math Paper', subject: 'Math', type: 'PDF', size: '2.1 MB', downloads: 85 },
    { id: 'm4', title: 'Web Development Guide', subject: 'CompSci', type: 'PDF', size: '5.8 MB', downloads: 210 },
];
