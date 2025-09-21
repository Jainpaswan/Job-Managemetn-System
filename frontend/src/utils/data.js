import {Palette,PenTool,FileSpreadsheet,Headphones,TrendingUp, FolderCode} from 'lucide-react';
const companies=["Google","Amazon","Samsung","Meta","Microsoft","Oracle","Walmart","Adobe","Flipkart","Spotify"];
const jobCategory = [
    {icon: FolderCode, title:"Software Developer", description: "Build Software using cutting edge tehnologies",jobs:"2k+ new jobs posted"},
    { icon: Palette, title: 'UI/UX Designer', description: 'Design interfaces and enhance user experience', jobs: '1.2k+ new jobs posted' },
    { icon: PenTool, title: 'Content Writing', description: 'Write and edit content for various platforms', jobs: '1.5k+ new jobs posted' },
    { icon: FileSpreadsheet, title: 'Data Entry', description: 'Input data into systems accurately and efficiently', jobs: '1k+ new jobs posted' },
    { icon: Headphones, title: 'Customer Support', description: 'Assist customers with inquiries and issues', jobs: '1.2k+ new jobs posted' },
    { icon: TrendingUp, title: 'Sales', description: 'Sell products and services to customers', jobs: '900+ new jobs posted' },

];
const work=[
    {
        "name":"Build Your Resume",
        "desc":"Create a standout resume with your skills"
    },
    {
        "name":"Apply for job",
        "desc":"Find and apply for jobs that suits your profile."
    },
    {
        "name":"Get Hired",
        "desc":"Connect with employers and start your new job."
    }
];
const testimonials=[
    {
        "name":"Sumit Gupta",
        "desc":"This job portal made job search easy and quick. Recommended to all job seekers!",
        "rating":"⭐⭐⭐⭐⭐",
        "avatar":"Avatar1.jpg"
    },
    {
        "name":"Abhishek Kumar",
        "desc":"Found my dream job within a week!.The application process was smooth",
        "rating":"⭐⭐⭐⭐",
        "avatar":"Avatar4.jpg"
    },
    {
        "name":"shruti Bansal",
        "desc":"It's one of the best job portal I've used. Loved it so much!",
        "rating": "⭐⭐⭐⭐⭐",
        "avatar":"Avatar2.jpg"
    },
    {
        "name":"Shreya Sharma",
        "desc":"I secured a job offer within days of applying. Exceptional user experience and support!",
        "rating":"⭐⭐⭐⭐",
        "avatar":"Avatar3.jpg"
    }

]
const footerLinks=[
    {title:"Product", link:["Find Job","Find Company","Find Employee"]},
    {title:"Company", link:["About us","Contact us","Privacy Policy","Terms and Conditions"]},
    {title:"Support", link:["Help & Support","Feedback","FAQs"]}
]

export {companies,work,testimonials,jobCategory,footerLinks};