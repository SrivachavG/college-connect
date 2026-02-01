export const CATEGORY_COLORS = {
    Physics: { text: 'text-blue-400', bg: 'bg-blue-500/10', main: 'blue-600' },
    CompSci: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', main: 'emerald-700' },
    Math: { text: 'text-violet-400', bg: 'bg-violet-500/10', main: 'violet-700' },
    Literature: { text: 'text-pink-400', bg: 'bg-pink-500/10', main: 'pink-700' },
    Economics: { text: 'text-amber-400', bg: 'bg-amber-500/10', main: 'amber-700' },
    Design: { text: 'text-teal-400', bg: 'bg-teal-500/10', main: 'teal-700' },
    History: { text: 'text-stone-400', bg: 'bg-stone-500/10', main: 'stone-500' },
    Biology: { text: 'text-green-400', bg: 'bg-green-500/10', main: 'green-700' },
    Chemistry: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', main: 'cyan-700' },
    Psychology: { text: 'text-rose-400', bg: 'bg-rose-500/10', main: 'rose-600' },
    Philosophy: { text: 'text-lime-400', bg: 'bg-lime-500/10', main: 'lime-600' },
    Default: { text: 'text-gray-400', bg: 'bg-gray-500/10', main: 'gray-600' }
};

export const SAMPLE_COLLEGES = [
    { id: 'iitb', name: 'Indian Institute of Technology, Bombay', location: 'Mumbai, Maharashtra', logo: '0A2540/FFFFFF?text=IITB', courses: 12, students: 500, tags: ['engineering', 'research'], description: 'IIT Bombay is a world-renowned institution for engineering education and research.', coursesOffered: ['PHYS101', 'CS202', 'MATH301'] },
    { id: 'du', name: 'Delhi University', location: 'New Delhi, Delhi', logo: '800000/FFFFFF?text=DU', courses: 25, students: 1200, tags: ['arts', 'commerce', 'science'], description: 'Renowned for its arts and commerce programs.', coursesOffered: ['LIT205', 'ECO101'] },
    { id: 'vit', name: 'Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', logo: 'FFBF00/000000?text=VIT', courses: 18, students: 900, tags: ['engineering', 'technology'], description: 'Known for its engineering and management programs.', coursesOffered: ['CS202', 'DSGN110'] },
];

export const SAMPLE_COURSES = [
    { id: 'PHYS101', name: 'Classical Mechanics', instructor: 'Dr. Evelyn Reed', category: 'Physics', students: 45, files: 23, schedule: 'Mon, Wed 10AM', isEnrolled: true },
    { id: 'CS202', name: 'Data Structures', instructor: 'Prof. Alan Turing', category: 'CompSci', students: 60, files: 40, schedule: 'Tue, Thu 2PM', isEnrolled: true },
    { id: 'MATH301', name: 'Linear Algebra', instructor: 'Dr. Ada Lovelace', category: 'Math', students: 50, files: 15, schedule: 'Fri 11AM', isEnrolled: false },
    { id: 'ECO101', name: 'Principles of Economics', instructor: 'Prof. John M. Keynes', category: 'Economics', students: 55, files: 20, schedule: 'Tue, Thu 9AM', isEnrolled: true },
];

export const SAMPLE_MATERIALS = [
    {
        id: 'm1',
        title: 'Quantum Physics: Lecture Notes',
        subject: 'Physics',
        type: 'PDF',
        size: '2.4 MB',
        downloads: 850,
        url: 'https://ncert.nic.in/pdf/publication/sciencetextbook/classXI/keph101.pdf'
    },
    {
        id: 'm2',
        title: 'Data Structures with C++',
        subject: 'Computer Science',
        type: 'PDF',
        size: '1.8 MB',
        downloads: 1240,
        url: 'https://www.iitk.ac.in/esc101/2009Jan/lecturenotes/lecture1.pdf'
    },
    {
        id: 'm3',
        title: 'Advanced Macroeconomics',
        subject: 'Economics',
        type: 'PDF',
        size: '3.2 MB',
        downloads: 620,
        url: 'https://www.icsi.edu/media/webmodules/Business_Economics.pdf'
    },
    {
        id: 'm4',
        title: 'Thermodynamics: Heat Laws',
        subject: 'Mechanical',
        type: 'PDF',
        size: '12.4 MB',
        downloads: 850,
        url: 'https://me.metu.edu.tr/sites/me.metu.edu.tr/files/LectureNotes/ME203/Lecture%20Notes%20on%20Thermodynamics.pdf'
    },
    {
        id: 'm5',
        title: 'Circuit Analysis: Kirchhoffs Laws',
        subject: 'Electrical',
        type: 'PDF',
        size: '5.2 MB',
        downloads: 620,
        url: 'https://www.engr.uky.edu/~ray/ee211/LectureNotes/EE211_LectureNotes.pdf'
    },
    {
        id: 'm6',
        title: 'Structural Engineering: Truss Analysis',
        subject: 'Civil',
        type: 'PDF',
        size: '10.1 MB',
        downloads: 540,
        url: 'https://www.unm.edu/~jjs/ce324/ce324_notes.pdf'
    }
];

export const EXTERNAL_RESOURCES = [
    { id: 'r1', name: 'Scribd: Engineering Archive', url: 'https://www.scribd.com/', type: 'Library', icon: 'book' },
    { id: 'r2', name: 'ResearchGate: Academic Papers', url: 'https://www.researchgate.net/', type: 'Journal', icon: 'file-text' },
    { id: 'r3', name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/', type: 'Courseware', icon: 'graduation-cap' },
];

export const SAMPLE_EVENTS = [
    { id: 'e1', title: 'Tech Symposium 2026', date: 'Feb 15, 2026', time: '10:00 AM', location: 'Main Auditorium', type: 'event', category: 'Tech' },
    { id: 'e2', title: 'Physics Midterm Exam', date: 'Feb 12, 2026', time: '02:00 PM', location: 'Hall A', type: 'deadline', category: 'Academic' },
];

export const SAMPLE_CHATS = [
    { id: 'chat1', name: 'PHYS101 Group', type: 'group', lastMessage: "Dr. Reed: Don't forget the assignment...", time: '10:30 AM', unread: 3, avatarSeed: 'PG', online: true },
    { id: 'chat2', name: 'Alice Wonderland', type: 'user', lastMessage: "Sure, I can help with that!", time: 'Yesterday', unread: 0, avatarSeed: 'AW', online: false },
];

export const USER_PROFILE = {
    name: 'Sunny S.',
    university: 'IIT Bombay',
    major: 'B.Tech Computer Science & Engineering'
};
