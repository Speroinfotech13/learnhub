import { useState, useMemo, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   CATEGORIES  (original colour theme)
══════════════════════════════════════════════ */
const CATS = [
  { id:"excel",      label:"Microsoft Excel",   icon:"📊", color:"#16a34a", bg:"#dcfce7",
    img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=480&h=220&fit=crop&auto=format",
    desc:"Formulas, charts, pivot tables & data magic" },
  { id:"word",       label:"Microsoft Word",    icon:"📝", color:"#2563eb", bg:"#dbeafe",
    img:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=480&h=220&fit=crop&auto=format",
    desc:"Documents, formatting, templates & mail merge" },
  { id:"powerpoint", label:"PowerPoint",        icon:"📽️", color:"#dc2626", bg:"#fee2e2",
    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=220&fit=crop&auto=format",
    desc:"Slides, animations, transitions & design" },
  { id:"python",     label:"Python",            icon:"🐍", color:"#ca8a04", bg:"#fef9c3",
    img:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=480&h=220&fit=crop&auto=format",
    desc:"Code, logic, functions & real-world apps" },
  { id:"windows",    label:"Windows OS",        icon:"🖥️", color:"#7c3aed", bg:"#ede9fe",
    img:"https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=480&h=220&fit=crop&auto=format",
    desc:"Desktop, files, settings & shortcuts" },
  { id:"internet",   label:"Internet & Email",  icon:"🌐", color:"#0891b2", bg:"#cffafe",
    img:"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=480&h=220&fit=crop&auto=format",
    desc:"Browse, email, social media & online safety" },
  { id:"photoshop",  label:"Photoshop",         icon:"🎨", color:"#7c3aed", bg:"#f3e8ff",
    img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=480&h=220&fit=crop&auto=format",
    desc:"Edit photos, design graphics & retouch" },
  { id:"google",     label:"Google Workspace",  icon:"🔵", color:"#ea580c", bg:"#ffedd5",
    img:"https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=480&h=220&fit=crop&auto=format",
    desc:"Docs, Sheets, Drive, Meet & Gmail" },
  { id:"accounting", label:"Accounting",        icon:"💰", color:"#065f46", bg:"#d1fae5",
    img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=480&h=220&fit=crop&auto=format",
    desc:"Bookkeeping, invoices, tax & reports" },
  { id:"typing",     label:"Typing & Keyboard", icon:"⌨️", color:"#be185d", bg:"#fce7f3",
    img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=480&h=220&fit=crop&auto=format",
    desc:"Touch typing, shortcuts & speed" },
  { id:"data",       label:"Data & Databases",  icon:"🗂️", color:"#1d4ed8", bg:"#eff6ff",
    img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=220&fit=crop&auto=format",
    desc:"Data entry, Access, cleaning & analysis" },
  { id:"networking", label:"Networking",        icon:"🔗", color:"#b45309", bg:"#fef3c7",
    img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=220&fit=crop&auto=format",
    desc:"WiFi, IP addresses, routers & security" },
  { id:"aiprompt",   label:"AI & Prompting",    icon:"🤖", color:"#7c3aed", bg:"#ede9fe",
    img:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=480&h=220&fit=crop&auto=format",
    desc:"Prompt engineering, Claude, Gemini, Copilot & more",
    isNew:true },
  { id:"chatgpt",    label:"ChatGPT & OpenAI",  icon:"💬", color:"#059669", bg:"#d1fae5",
    img:"https://images.unsplash.com/photo-1684779847639-fbcc5a57a2b0?w=480&h=220&fit=crop&auto=format",
    desc:"ChatGPT, DALL-E, GPT-4o, Sora & OpenAI tools",
    isNew:true },
  { id:"aicreative",  label:"AI Creative Tools", icon:"🎬", color:"#e11d48", bg:"#ffe4e6",
    img:"https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=480&h=220&fit=crop&auto=format",
    desc:"Kling, Midjourney, Runway, ElevenLabs & AI video",
    isNew:true },
];

/* ══════════════════════════════════════════════
   TOPICS
══════════════════════════════════════════════ */
const TOPICS = {
excel:["Entering & Editing Data","SUM, AVERAGE & COUNT","Cell References","Format Numbers as Currency","Freeze Rows and Columns","Sort by Any Column","Filter Data with One Click","Create a Bar Chart","Build a Pie Chart","Line Chart for Trends","AutoFill Handles","Flash Fill Trick","Conditional Formatting","Data Validation Dropdowns","IF Function","VLOOKUP Made Simple","HLOOKUP Walkthrough","COUNTIF & SUMIF","IFERROR for Blanks","Named Ranges","Protect Cells & Sheets","Link Data Across Sheets","Excel Tables","PivotTable Basics","PivotChart","Slicers for Tables","Sparklines in Cells","Remove Duplicates","Text to Columns","Merge & Centre Cells","Wrap Text","Comments & Notes","Track Changes","Page Breaks & Print Area","Headers & Footers","Custom Number Formats","Password Protect","Macro Recorder","Quick Access Toolbar","Keyboard Shortcuts","Budget Tracker Template","Monthly Expense Sheet","Sales Report Layout","Invoice Builder","Attendance Register","Project Timeline Chart","Loan Calculator","Grade Book Formula","Stock Inventory","Employee Schedule","BMI Calculator Sheet","KPI Dashboard","LEFT RIGHT MID Functions","CONCATENATE Columns","TODAY & NOW","Working with Dates","ROUND Function","AND / OR in Formulas","MATCH & INDEX","Nested IF Statements","SUMIFS with Multiple Criteria","Power Query Introduction","Import CSV Files","Data from Web","Split Panes View","Group Rows & Columns","Formula Auditing","Trace Precedents","Goal Seek Tool","Solver Add-in","Array Formulas","Scenario Manager","Watch Window","Name Manager"],
word:["Typing & Editing Text","Bold Italic & Underline","Font Size & Colour","Highlight Text","Paragraph Alignment","Line Spacing","Bullet Lists","Numbered Lists","Styles & Headings","Auto Table of Contents","Page Margins & Orientation","Headers & Footers","Page Numbers","Footnotes & Endnotes","Insert Images","Resize & Crop Images","Text Wrapping","Insert a Table","Format Table Borders","Merge Table Cells","Shapes & SmartArt","Word Count Tool","Spell & Grammar Check","Find & Replace","Track Changes","Accept or Reject Edits","Comments in Word","Protect a Document","Apply a Document Theme","Mail Merge Letters","Mail Merge Envelopes","Mail Merge Labels","AutoCorrect Settings","Building Blocks","Bookmarks","Hyperlinks","Cross-References","Resume Template","Cover Letter Format","Business Letter","Memo Template","Report Layout","Essay Formatting","Academic Paper","Invoice in Word","Contract Template","Meeting Agenda","Meeting Minutes","Newsletter Layout","Brochure Design","Certificate Template","Flyer Layout","Two-Column Layout","Drop Cap Effect","Watermarks","Section Breaks","Column Breaks","Master Document","Macros in Word","Quick Parts","Ribbon Customisation","Read Aloud Feature","Dictate to Word","Focus Mode","Compare Documents","Restrict Editing","Digital Signature","Embed Fonts","Insert Symbol"],
powerpoint:["Add & Edit Text Boxes","Apply a Theme","Change Slide Layout","Slide Master Setup","Add Images to Slides","Background Colours","Insert Shapes","Align & Group Objects","Slide Transitions","Entrance Animations","Exit Animations","Motion Path Effects","Animation Timing","Trigger Animations","Presenter View","Slide Show Settings","Loop a Presentation","Kiosk Mode","Insert Charts","Insert Tables","Embed Video","Add Audio","SmartArt Diagrams","WordArt Effects","Action Buttons","Hyperlinks Between Slides","Slide Notes Panel","Print Handouts","Custom Slide Sizes","Export to Video","Reuse Slides","Section Dividers","Business Pitch Deck","Educational Slides","Sales Deck","Project Proposal Slides","Portfolio Presentation","Timeline Slide","Comparison Slide","Data Story Slide","Thank You Slide","Title Slide Design","Photo Album Slides","Quote Slide","Infographic Slide","Process Flow Diagram","Org Chart Slide","SWOT Analysis Slide","Before & After Slide","Agenda Slide","Dashboard Slide","Zoom Feature","Morph Transition","3D Objects","Icons Library","Design Ideas Panel","Remove Background","Picture Effects","Co-author in Real Time","Present in Teams","Screen Recording"],
python:["Install Python & First Code","Print & Input Functions","Variables & Data Types","Strings: Slicing & Methods","Numbers: Int Float Math","Boolean & Comparisons","If Elif Else Logic","While Loop","For Loop with Range","Lists: Add Remove Loop","Tuples Explained","Dictionaries: Key & Value","Sets Basics","Define & Call Functions","Parameters & Return Values","Default Arguments","List Comprehension","Dictionary Comprehension","Lambda Functions","Map & Filter","Try Except Error Handling","Read a Text File","Write to a File","Append to File","CSV Reader Module","Random Module","Math Module","Datetime Module","OS Module","pip & Install Packages","Simple Calculator App","Number Guessing Game","Password Generator","To-Do List App","Temperature Converter","Grade Calculator","Word Counter","Fibonacci Generator","Palindrome Checker","Simple Quiz Game","Currency Converter","BMI Calculator","Prime Number Checker","Rock Paper Scissors","Dice Roller App","Countdown Timer","Mad Libs Generator","Flashcard App","Simple Budget Tracker","Contact Book App"],
windows:["Desktop & Taskbar Overview","Start Menu & Search","File Explorer Tour","Create & Rename Folders","Copy Move & Delete Files","Recycle Bin Management","Desktop Shortcuts","Pin to Taskbar","Settings App Overview","Display & Resolution","Personalise Wallpaper","Sound Settings","WiFi & Network Setup","Bluetooth Pairing","Printer Installation","User Account Setup","Windows Update","Install & Uninstall Apps","Default App Settings","Disk Space Management","Task Manager","Startup Programs Control","Disk Cleanup","System Restore","Windows Defender","Firewall Basics","Backup with File History","Screenshots: 4 Methods","Snipping Tool","Sticky Notes","Virtual Desktops","Split Screen Apps","Focus Assist","Accessibility Settings","Night Light Mode","Battery Saver Mode","Remote Desktop Intro","Windows Keyboard Shortcuts","Mouse & Trackpad Settings","File Associations"],
internet:["Browser Basics: Tabs & Bookmarks","Google Search Tips","Advanced Search Operators","Create a Gmail Account","Compose & Send Emails","Attach Files to Email","CC BCC Explained","Organise Email with Labels","Create Email Filters","Block Spam","Set Email Signature","Google Drive Upload","Share Files & Folders","Google Docs Overview","Google Sheets Overview","Google Slides Overview","Google Forms Quiz","Google Calendar Events","Google Meet Video Call","YouTube Watch & Manage","Facebook Account Setup","Facebook Privacy Settings","WhatsApp Web on PC","Instagram on Desktop","LinkedIn Profile Tips","Online Shopping Safely","Secure Password Habits","Two-Factor Authentication","Spot Phishing Emails","Dropbox Setup","OneDrive Basics","Zoom Meeting Setup","Microsoft Teams Basics","Clear Browser Cache","Incognito Private Mode","VPN What & Why","Public WiFi Safety","Stream Netflix & YouTube","Online Banking Safety","Digital Payments & UPI"],
photoshop:["Photoshop Interface Tour","Open & Save Files","Artboards & Canvas Size","Layers Panel Basics","Layer Groups & Folders","Move & Transform Layers","Selection: Marquee Tools","Quick Selection Tool","Magic Wand Tool","Lasso & Polygon Lasso","Refine Edge / Select Mask","Crop & Straighten","Brush Tool & Presets","Eraser Tool","Clone Stamp Tool","Healing Brush & Spot Heal","Patch Tool","Content-Aware Fill","Adjustment Layers","Hue & Saturation","Levels & Curves","Brightness & Contrast","Color Balance","Vibrance & Saturation","Remove Background","Replace Sky","Text Tool & Formatting","Layer Styles: Shadow Glow","Blending Modes Explained","Smart Objects","Smart Filters","Camera Raw Filter","Sharpen & Blur","Liquify Tool","Batch Processing & Actions","Export for Web","Create a Poster","Social Media Post Design","Photo Collage","Logo Concept","Mockup Template","Photo Retouching Workflow","Double Exposure Effect","Colour Grading","Background Replacement","Create GIF in Photoshop"],
google:["Google Account Setup","Drive: Folders & Shortcuts","Docs: Format & Style","Docs: Table of Contents","Docs: Comments & Suggestions","Sheets: Formulas Intro","Sheets: VLOOKUP","Sheets: Charts","Sheets: Pivot Table","Sheets: Conditional Formatting","Slides: Theme & Layout","Slides: Animations","Forms: Build a Survey","Forms: Quiz with Scoring","Calendar: Create Events","Calendar: Share Calendar","Meet: Start & Join Call","Meet: Screen Share","Gmail: Labels & Filters","Gmail: Offline Mode","Shared Drives Setup","Version History in Docs","Google Keep Notes","Google Tasks","Google Sites: Build a Page","Google Classroom: Teacher","Google Classroom: Student","YouTube Studio Basics","Google Photos: Albums","Google Maps: My Maps","Google Translate Tool","Google Lens on Phone","Chrome: Extensions","Chrome: Password Manager","Google One Storage","Google Pay Setup","Google Analytics Intro","Google Search Console","Google Ads Overview","Google Workspace Admin"],
accounting:["Accounting Basics: What & Why","Debit & Credit Rules","Chart of Accounts","Journal Entries","Posting to Ledger","Trial Balance","Income Statement","Balance Sheet Layout","Cash Flow Statement","Bank Reconciliation","Petty Cash Management","Invoice Creation","Purchase Order Basics","Receipt & Voucher","Expense Tracking Sheet","Payroll Calculation","Tax Basics","VAT / GST Explained","TDS Overview","Bookkeeping Workflow","QuickBooks: Enter Transactions","QuickBooks: Reports","Tally: Voucher Entry","Tally: Reports","Wave Accounting Setup","FreshBooks Invoice","Zoho Books Basics","Excel for Accounting","Break-Even Analysis","Profit & Loss Report","Budget vs Actual","Variance Analysis","Straight-Line Depreciation","Accounts Payable","Accounts Receivable","Credit Note & Debit Note","Accrual vs Cash Basis","Financial Ratios","Cost of Goods Sold","Working Capital"],
typing:["Keyboard Layout: QWERTY","Home Row Finger Placement","Left Hand Keys A–G","Right Hand Keys H–;","Shift Key for Capitals","Number Row 1–0","Symbols: ! @ # $ %","Backspace & Delete Keys","Tab Key Uses","Arrow Keys Navigation","Page Up / Page Down","Home & End Keys","Function Keys F1–F12","Windows Key Shortcuts","Alt & Ctrl Combos","Ctrl+C Copy Ctrl+V Paste","Ctrl+Z Undo Ctrl+Y Redo","Ctrl+A Select All","Ctrl+F Find","Ctrl+S Save","Ctrl+P Print","Ctrl+B Bold Ctrl+I Italic","Alt+Tab Switch Windows","Win+D Show Desktop","Win+L Lock Screen","Screenshot: PrtScr Key","Numeric Keypad","Touch Typing Method","Improve Typing Speed","Reduce Typing Errors"],
data:["Data Entry Accuracy Tips","Excel Data Entry Form","Google Sheets Entry","MS Access: Create Tables","Access: Form for Entry","Access: Run a Query","Access: Print Report","Data Validation in Excel","Drop-Down Lists","Error Alert Messages","Find Duplicates","Remove Duplicates","Data Cleaning Steps","Text Import Wizard","CSV File Handling","Sort & Filter Data","PivotTable for Analysis","VLOOKUP for Data Match","INDEX MATCH Pair","Conditional Formatting Data","Concatenate Columns","Split One Column","Flash Fill for Patterns","Find & Replace in Data","Freeze First Row","Date Format Consistency","IFERROR for Output","TRIM Extra Spaces","CLEAN Non-Printable Chars","Power Query: Clean Data","Power Query: Merge Tables","Online Form Data","Google Forms to Sheets","CRM Data Basics","HR Data Entry Fields","Payroll Data Entry","Inventory Data Entry","Survey Response Entry","Image Data Entry","OCR Basics"],
networking:["What is a Network?","LAN WAN MAN Explained","How the Internet Works","IP Address IPv4 & IPv6","Public vs Private IP","Router vs Switch vs Hub","WiFi Standards: 2.4G vs 5G","Connect to WiFi","Set Up Home Router","Change WiFi Password","Ethernet Cable Types","Ping: Test Connection","Traceroute Command","NSLookup for DNS","What is DNS?","What is DHCP?","Subnetting Made Simple","MAC Address Explained","Firewall Basics","Port & Port Number","TCP vs UDP","HTTP vs HTTPS","VPN: What & How","Proxy Server Basics","NAT Explained","Network Troubleshooting","Reset Network Settings","Renew IP Address","WiFi Password Forgotten Fix","Network Printer Setup","File Sharing on Network","Remote Desktop Setup","TeamViewer Quick Start","Cloud Storage & Sync","IoT Devices on Network","Smart Home Network","Guest WiFi Setup","Parental Controls Router","Speed Test Interpret","Network Monitoring Tools"],
aiprompt:[
  "What is Artificial Intelligence?","How AI Language Models Work","What is a Large Language Model",
  "Introduction to Prompt Engineering","Anatomy of a Perfect Prompt","Zero-Shot Prompting Explained",
  "Few-Shot Prompting with Examples","Chain of Thought Prompting","Tree of Thought Prompting",
  "Role-Based Prompting Technique","System Prompts vs User Prompts","Writing Clear AI Instructions",
  "Prompt Templates & Structures","Iterative Prompting Method","Context Window Explained",
  "Temperature & Top-P Settings","AI Hallucination: What & Why","Reduce AI Hallucinations",
  "Prompt Chaining Technique","ReAct Prompting Strategy","Socratic Prompting Method",
  "Getting Started with Claude","Claude Interface Tour","Claude vs ChatGPT Comparison",
  "Claude for Long Documents","Claude for Coding Projects","Claude Artifacts Feature",
  "Claude Projects Feature","Claude for Creative Writing","Claude API Basics",
  "Writing System Prompts for Claude","Claude Extended Thinking","Claude for Research",
  "Getting Started with Gemini","Gemini Advanced Features","Gemini for Google Workspace",
  "Gemini Image & Vision Understanding","Gemini Deep Research Feature","Google AI Studio Tour",
  "Gemini API Basics","Gemini vs ChatGPT Comparison","Gemini 2.0 Flash Features",
  "What is Hostinger Horizons","Build a Website with Horizons AI","Customise Your Horizons Site",
  "Horizons AI Templates Guide","Deploy with Hostinger Horizons","Horizons for E-commerce",
  "Connect Domain to Horizons Site","Horizons vs Other AI Builders","Horizons SEO Settings",
  "Microsoft Copilot Basics","Copilot in Word & Excel","Copilot in Teams & Outlook",
  "Perplexity AI Search Engine","Perplexity for Research","You.com AI Search",
  "Notion AI Features","Grammarly AI Writing Assistant","Jasper AI for Copywriting",
  "AI for Email Writing","AI for Social Media Posts","AI for Business Reports",
  "AI for Resume & CV Writing","AI for Job Interview Prep","AI for Research & Summaries",
  "AI Tools for Students","AI Tools for Freelancers","AI Tools for Small Business",
  "Build an AI Workflow","Automate Tasks with AI","Zapier AI Automation Basics",
  "AI Ethics & Responsible Use","AI Safety Basics","Prompt Injection Awareness",
  "AI vs Human: When to Use Each","Future of AI: What's Coming","AI Terminology Glossary",
],
chatgpt:[
  "Create a ChatGPT Account","ChatGPT Interface Tour","Your First ChatGPT Conversation",
  "ChatGPT Free vs Plus vs Pro","Writing Better ChatGPT Prompts","ChatGPT Custom Instructions",
  "ChatGPT Memory Feature","ChatGPT for Writing & Editing","ChatGPT for Proofreading",
  "ChatGPT for Email Drafts","ChatGPT for Social Media Posts","ChatGPT for Blog Writing",
  "ChatGPT for Research","ChatGPT for Summarising Text","ChatGPT for Brainstorming",
  "ChatGPT for Code Generation","ChatGPT: Debug Your Code","ChatGPT for Excel Formulas",
  "ChatGPT for Data Analysis","ChatGPT Image Generation with DALL-E","DALL-E 3 Prompt Writing",
  "ChatGPT Voice Mode","ChatGPT Browse the Web","ChatGPT File Upload & Analysis",
  "ChatGPT Custom GPTs Explained","Build Your Own Custom GPT","ChatGPT GPT Store Guide",
  "ChatGPT for Business Plans","ChatGPT for Marketing Copy","ChatGPT for Product Descriptions",
  "ChatGPT for Customer Service Scripts","ChatGPT for HR & Recruitment","ChatGPT for Teachers",
  "ChatGPT for Students","ChatGPT for Developers","ChatGPT Canvas Feature",
  "GPT-4o vs GPT-4 Differences","ChatGPT Real-Time Search","Multi-Modal ChatGPT Usage",
  "ChatGPT for Translation","ChatGPT for Language Learning","ChatGPT Conversation Tips",
  "Save & Share ChatGPT Chats","ChatGPT Privacy Settings","ChatGPT API Introduction",
  "OpenAI Playground Tour","OpenAI Sora Video AI","ChatGPT Productivity Hacks",
  "ChatGPT Prompts for Any Job","ChatGPT for Side Hustles","ChatGPT Projects Feature",
],
aicreative:[
  "What is AI Image Generation?","What is AI Video Generation?","AI Creative Tools Overview",
  "Kling AI: Getting Started","Kling AI Text to Video","Kling AI Image to Video",
  "Kling AI Camera Movement Controls","Kling AI Prompt Writing Tips","Kling AI Character Consistency",
  "Kling AI for Social Media Videos","Kling AI Advanced Settings","Kling AI vs Other Video AI",
  "Midjourney Account Setup","Midjourney Basic Commands","Midjourney Prompt Writing",
  "Midjourney Aspect Ratios & Sizes","Midjourney Styles & Aesthetics","Midjourney v6 Features",
  "Midjourney for Logo Design","Midjourney for Product Mockups","Midjourney Inpainting",
  "Adobe Firefly AI Tools","Adobe Firefly Generative Fill","Canva AI Image Generator",
  "Canva Magic Studio Features","Stable Diffusion Basics","Stable Diffusion Prompting",
  "RunwayML Gen-3 Video","Runway Video Inpainting","Runway Motion Brush",
  "Pika Labs Video Generation","Luma AI Dream Machine","Luma AI Extend Video",
  "HeyGen AI Avatar Videos","HeyGen Video Translation","Synthesia AI Presenter",
  "D-ID Talking Photo","ElevenLabs Voice Cloning","ElevenLabs Text to Speech",
  "Murf AI Voice Over","Suno AI Music Generation","Udio AI Music Creation",
  "Remove.bg Background Remover","Upscale AI Image Quality","AI Photo Restoration",
  "AI Art Style Transfer","AI Logo Generation Tools","AI Thumbnail Creator",
  "AI Banner & Poster Design","AI Video Auto Subtitles","Kapwing AI Video Editor",
  "Descript AI Podcast Editor","Adobe Podcast AI Enhance","AI Interior Design Tools",
  "AI Product Photography","AI Social Media Content Creator","AI Carousel Post Maker",
],
};

/* ══════════════════════════════════════════════
   BUILD COURSES
══════════════════════════════════════════════ */
function buildAll() {
  const ratings=[4.3,4.4,4.5,4.6,4.7,4.8,4.9,5.0];
  const times=["15 min","20 min","25 min","30 min","35 min","40 min"];
  const students=[310,480,620,750,890,1050,1240,1400,1600,1900,2200,2500];
  const pages=[8,9,10,11,12,13,14];
  let list=[]; let id=1;
  CATS.forEach(cat => {
    (TOPICS[cat.id]||[]).forEach((title,i) => {
      list.push({ id:id++, cat:cat.id, title, time:times[i%times.length],
        rating:ratings[i%ratings.length], students:students[i%students.length],
        pages:pages[i%pages.length], steps:5+(i%8), price:5 });
    });
  });
  const base=[...list];
  while(list.length<1040){
    const s=base[list.length%base.length];
    list.push({...s,id:id++,title:s.title+" – Part 2",steps:s.steps+3,pages:s.pages+3});
  }
  return list;
}
const ALL = buildAll();

/* ══════════════════════════════════════════════
   AI TUTOR — shared step labels
══════════════════════════════════════════════ */
const STEP_HEADS=["Getting Started","Step-by-Step Walkthrough","Hands-On Practice","Common Pitfalls","Pro Tips & Shortcuts","Real-World Example","Quick-Reference Checklist","Summary & Next Steps"];

/* ══════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════ */
function Counter({end,suffix=""}) {
  const [val,setVal]=useState(0);
  const ref=useRef();
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        let start=0;
        const inc=Math.ceil(end/60);
        const t=setInterval(()=>{
          start+=inc;
          if(start>=end){setVal(end);clearInterval(t);}
          else setVal(start);
        },24);
      }
    },{threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ══════════════════════════════════════════════
   TESTIMONIALS DATA
══════════════════════════════════════════════ */
const TESTIMONIALS=[
  {name:"Amara K.",role:"Office Admin",text:"I finally understand Excel! The VLOOKUP guide saved me hours every week at work.",avatar:"🧑‍💼",stars:5},
  {name:"Rajesh M.",role:"Small Business Owner",text:"The accounting guides are perfect — clear language, no confusing terms. Worth every cent.",avatar:"👨‍💻",stars:5},
  {name:"Sarah T.",role:"Student",text:"Python made sense to me for the first time after downloading the step-by-step guide.",avatar:"👩‍🎓",stars:5},
  {name:"David O.",role:"Freelancer",text:"Photoshop guide was fantastic. I learned background removal in under 30 minutes!",avatar:"🧑‍🎨",stars:5},
  {name:"Priya N.",role:"Teacher",text:"I use these Google Workspace guides to train my colleagues. Clear, practical, excellent.",avatar:"👩‍🏫",stars:5},
];

/* ══════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════ */
const GLOBAL_CSS=`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:#f1f5f9;}
::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:3px;}
input:focus{outline:none;border-color:#3b82f6!important;box-shadow:0 0 0 3px #3b82f620;}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes floatB{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes marqueeL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes badgePop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}
.card-anim{animation:fadeUp .4s ease both;}
.hero-float{animation:float 4s ease-in-out infinite;}
.hero-float-b{animation:floatB 5s ease-in-out infinite;}
`;

/* ══════════════════════════════════════════════
   PER-COURSE BANNER GENERATOR
   Every course gets a distinct illustrated banner —
   unique gradient angle + pattern + icon placement,
   deterministically seeded from the course id.
══════════════════════════════════════════════ */
const BANNER_ANGLES=[125,150,200,70,160,225,95,180];
const BANNER_PATTERNS=[
  {backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,.4) 1.6px, transparent 1.6px)",size:"20px 20px",layers:1},
  {backgroundImage:"repeating-linear-gradient(45deg, rgba(255,255,255,.2) 0px, rgba(255,255,255,.2) 2px, transparent 2px, transparent 15px)",size:"auto",layers:1},
  {backgroundImage:"linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",size:"24px 24px",layers:2},
  {backgroundImage:"repeating-linear-gradient(45deg, rgba(255,255,255,.13) 0, rgba(255,255,255,.13) 1px, transparent 1px, transparent 11px), repeating-linear-gradient(-45deg, rgba(255,255,255,.13) 0, rgba(255,255,255,.13) 1px, transparent 1px, transparent 11px)",size:"auto",layers:2},
  {backgroundImage:"radial-gradient(circle at 25% 28%, rgba(255,255,255,.3) 0%, transparent 42%), radial-gradient(circle at 80% 78%, rgba(255,255,255,.2) 0%, transparent 38%)",size:"auto",layers:2},
  {backgroundImage:"repeating-linear-gradient(-60deg, rgba(255,255,255,.16) 0px, rgba(255,255,255,.16) 3px, transparent 3px, transparent 16px)",size:"auto",layers:1},
];
const ICON_POS=[
  {top:"6%",left:"60%"},{top:"42%",left:"2%"},{top:"52%",left:"66%"},
  {top:"8%",left:"6%"},{top:"55%",left:"4%"},{top:"4%",left:"38%"},
];
const ICON_ROT=[-14,-7,5,13,0,-20,9];
const ICON_SIZE=[58,68,76,62,72];

function bannerStyle(course,cat){
  const id=course.id;
  const angle=BANNER_ANGLES[id%BANNER_ANGLES.length];
  const pattern=BANNER_PATTERNS[id%BANNER_PATTERNS.length];
  const baseGradient=`linear-gradient(${angle}deg, ${cat.color}, ${cat.color}b0)`;
  const sizes=Array(pattern.layers).fill(pattern.size);
  return {
    backgroundColor:cat.color,
    backgroundImage:`${pattern.backgroundImage}, ${baseGradient}`,
    backgroundSize:[...sizes,"cover"].join(", "),
  };
}
function bannerIcon(course){
  const id=course.id;
  return {
    pos:ICON_POS[id%ICON_POS.length],
    rot:ICON_ROT[id%ICON_ROT.length],
    size:ICON_SIZE[id%ICON_SIZE.length],
  };
}

/* ══════════════════════════════════════════════
   STAR RATING
══════════════════════════════════════════════ */
function Stars({r,size=12}) {
  return <span style={{color:"#f59e0b",fontSize:size}}>
    {"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}
    <span style={{color:"#94a3b8",marginLeft:4,fontWeight:700,fontSize:size-1}}>{r.toFixed(1)}</span>
  </span>;
}

/* ══════════════════════════════════════════════
   COURSE CARD
══════════════════════════════════════════════ */
function Card({c,onBuy,owned,delay=0,onTutor}) {
  const cat=CATS.find(x=>x.id===c.cat);
  const [hov,setHov]=useState(false);
  return (
    <div
      className="card-anim"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:"white",borderRadius:18,overflow:"hidden",
        boxShadow:hov?"0 20px 48px rgba(0,0,0,0.14)":"0 2px 12px rgba(0,0,0,0.06)",
        transform:hov?"translateY(-6px) scale(1.01)":"none",
        transition:"all .25s cubic-bezier(.34,1.56,.64,1)",
        display:"flex",flexDirection:"column",
        border:`1.5px solid ${hov?cat.color+"44":"#f1f5f9"}`,
        animationDelay:`${delay}ms`,
      }}>
      {/* Banner — unique per course */}
      <div style={{
        position:"relative",overflow:"hidden",height:130,
        ...bannerStyle(c,cat),
        transform:hov?"scale(1.06)":"scale(1)",
        transition:"transform .4s ease",
      }}>
        {(()=>{const ic=bannerIcon(c);return(
          <div style={{
            position:"absolute",top:ic.pos.top,left:ic.pos.left,
            fontSize:ic.size,opacity:.22,
            transform:`rotate(${ic.rot}deg)`,
            pointerEvents:"none",lineHeight:1,
          }}>{cat.icon}</div>
        );})()}
        <div style={{
          position:"absolute",top:10,right:10,fontSize:22,
          background:"rgba(255,255,255,.22)",borderRadius:10,
          width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",
        }}>{cat.icon}</div>
        <div style={{
          position:"absolute",inset:0,
          background:`linear-gradient(to bottom, transparent 28%, ${cat.color}d8)`,
        }}/>
        <div style={{
          position:"absolute",bottom:10,left:12,right:12,
          display:"flex",alignItems:"center",justifyContent:"space-between",
        }}>
          <div style={{
            background:"white",borderRadius:8,padding:"3px 10px",
            fontSize:11,fontWeight:800,color:cat.color,
          }}>{cat.icon} {cat.label}</div>
          <div style={{
            background:"#16a34a",color:"white",borderRadius:8,
            padding:"3px 10px",fontSize:12,fontWeight:900,
          }}>$5/mo</div>
        </div>
      </div>
      {/* Body */}
      <div style={{padding:"14px 16px 0",flexGrow:1}}>
        <div style={{
          fontSize:13,fontWeight:800,color:"#0f172a",lineHeight:1.35,
          marginBottom:10,minHeight:36,
          display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",
        }}>{c.title}</div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
          {[{i:"📄",v:`${c.pages}p`},{i:"🎯",v:`${c.steps} steps`},{i:"⏱",v:c.time}].map(m=>(
            <span key={m.i} style={{
              background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:6,
              padding:"2px 7px",fontSize:11,color:"#64748b",fontWeight:700,
            }}>{m.i} {m.v}</span>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Stars r={c.rating}/>
          <span style={{fontSize:11,color:"#94a3b8"}}>{c.students.toLocaleString()} learners</span>
        </div>
      </div>
      {/* Footer */}
      <div style={{
        padding:"12px 16px",marginTop:10,
        borderTop:"1px solid #f1f5f9",
        display:"flex",alignItems:"center",justifyContent:"space-between",
      }}>
        <div>
          <span style={{fontSize:18,fontWeight:900,color:"#16a34a"}}>$5</span>
          <span style={{fontSize:11,color:"#94a3b8",marginLeft:3}}>/mo</span>
        </div>
        {owned
          ? <button onClick={()=>onTutor(c)} title="Ask AI Tutor" style={{
              background:`linear-gradient(135deg,${cat.color},${cat.color}cc)`,
              color:"white",border:"none",borderRadius:9,
              padding:"7px 12px",fontSize:12,fontWeight:800,cursor:"pointer",
              display:"flex",alignItems:"center",gap:4,
              boxShadow:hov?`0 4px 14px ${cat.color}55`:"none",transition:"box-shadow .2s",
            }}>💬 Open Tutor</button>
          : <button onClick={()=>onBuy(c)} style={{
              background:`linear-gradient(135deg,${cat.color},${cat.color}cc)`,
              color:"white",border:"none",borderRadius:9,padding:"7px 12px",
              fontSize:12,fontWeight:800,cursor:"pointer",
              boxShadow:hov?`0 4px 16px ${cat.color}55`:"none",
              transition:"box-shadow .2s",
            }}>💬 Subscribe & Start</button>
        }
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CATEGORY CARD
══════════════════════════════════════════════ */
function CatCard({cat,count,active,onClick}) {
  const [hov,setHov]=useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        borderRadius:16,overflow:"hidden",cursor:"pointer",
        boxShadow:hov||active?"0 12px 36px rgba(0,0,0,0.15)":"0 2px 10px rgba(0,0,0,0.07)",
        transform:hov||active?"translateY(-4px)":"none",
        transition:"all .22s ease",
        border:`2.5px solid ${active?cat.color+"88":"transparent"}`,
        position:"relative",
      }}>
      <div style={{position:"relative",height:110,overflow:"hidden"}}>
        <img src={cat.img} alt={cat.label} style={{
          width:"100%",height:"100%",objectFit:"cover",
          transform:hov?"scale(1.06)":"scale(1)",transition:"transform .35s ease",
        }}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${cat.color}dd,${cat.color}88)`}}/>
        <div style={{position:"absolute",top:10,left:12,fontSize:28}}>{cat.icon}</div>
        {cat.isNew && (
          <div style={{
            position:"absolute",top:8,right:8,
            background:"linear-gradient(135deg,#f59e0b,#ef4444)",
            color:"white",borderRadius:8,padding:"2px 8px",
            fontSize:9,fontWeight:900,letterSpacing:"0.8px",
            boxShadow:"0 2px 8px rgba(245,158,11,.5)",animation:"pulse 2s ease infinite",
          }}>✨ NEW</div>
        )}
        {active && <div style={{
          position:"absolute",top:10,right:10,
          background:"white",color:cat.color,borderRadius:"50%",
          width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:13,fontWeight:900,animation:"badgePop .3s ease",
        }}>✓</div>}
      </div>
      <div style={{background:active?cat.color:cat.bg,padding:"10px 12px"}}>
        <div style={{fontSize:12,fontWeight:900,color:active?"white":cat.color,
          marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{cat.label}</div>
        <div style={{fontSize:11,color:active?"rgba(255,255,255,.8)":"#64748b",fontWeight:600}}>
          {count} courses
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAYMENT MODAL
══════════════════════════════════════════════ */
function PayModal({c,onClose}) {
  const cat=CATS.find(x=>x.id===c.cat);
  const [phase,setPhase]=useState(0); // 0=confirm, 1=redirecting, 2=error
  const [errMsg,setErrMsg]=useState("");

  async function startCheckout(){
    setPhase(1);
    setErrMsg("");
    try{
      const res=await fetch("/api/create-checkout-session",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({courseId:c.id,courseTitle:c.title}),
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok||!data.url){
        throw new Error(data.error||"Could not start checkout.");
      }
      window.location.href=data.url;
    }catch(e){
      setPhase(2);
      setErrMsg(
        e.message&&e.message!=="Failed to fetch"
          ?e.message
          :"Checkout isn't available in this preview. Deploy the site with the provided Stripe backend (api/create-checkout-session.js) to enable real subscriptions."
      );
    }
  }

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",
        backdropFilter:"blur(6px)",display:"flex",alignItems:"center",
        justifyContent:"center",zIndex:1000,padding:16,animation:"fadeIn .2s ease"}}>
      <div style={{background:"white",borderRadius:22,width:"100%",maxWidth:430,
        overflow:"hidden",boxShadow:"0 40px 80px rgba(0,0,0,.3)",
        animation:"fadeUp .3s ease"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${cat.color},${cat.color}aa)`,padding:"22px 26px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.75)",fontWeight:800,
                letterSpacing:"1px",marginBottom:4}}>SUBSCRIBING TO</div>
              <div style={{fontSize:17,fontWeight:900,color:"white",lineHeight:1.25}}>
                {c.title}
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:3}}>{cat.icon} {cat.label}</div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,.2)",border:"none",
              color:"white",width:30,height:30,borderRadius:8,cursor:"pointer",fontSize:18,
              fontFamily:"inherit"}}>×</button>
          </div>
          <div style={{background:"rgba(255,255,255,.15)",borderRadius:10,padding:"10px 16px",
            display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"rgba(255,255,255,.85)",fontSize:14,fontWeight:600}}>Billed monthly</span>
            <span style={{color:"white",fontWeight:900,fontSize:22}}>$5<span style={{fontSize:13,fontWeight:700,opacity:.8}}>/mo</span></span>
          </div>
        </div>
        {/* Body */}
        <div style={{padding:24}}>
          {phase===0 && <>
            <div style={{
              background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,
              padding:"16px 18px",marginBottom:20,fontSize:13.5,color:"#475569",lineHeight:1.7,
            }}>
              You'll be taken to Stripe's secure checkout to enter your card details.
              Stripe handles all payment info — LearnHub never sees or stores your card.
              Your subscription renews automatically every month until you cancel.
            </div>
            <button onClick={startCheckout} style={{
              width:"100%",background:`linear-gradient(135deg,${cat.color},${cat.color}cc)`,
              color:"white",border:"none",borderRadius:12,padding:"13px",
              fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",
              boxShadow:`0 6px 20px ${cat.color}44`,
            }}>🔒 Continue to Secure Checkout</button>
            <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:14,opacity:.55}}>
              {["🔒 Stripe Secured","🔁 Cancel Anytime","💬 AI Tutor Ready"].map(t=>(
                <span key={t} style={{fontSize:12,color:"#64748b",fontWeight:600}}>{t}</span>
              ))}
            </div>
          </>}
          {phase===1 && <div style={{textAlign:"center",padding:"30px 0"}}>
            <div style={{width:54,height:54,border:`4px solid ${cat.color}22`,
              borderTop:`4px solid ${cat.color}`,borderRadius:"50%",
              margin:"0 auto 20px",animation:"spin 1s linear infinite"}}/>
            <div style={{fontSize:18,fontWeight:800,color:"#1e293b"}}>Redirecting to Stripe…</div>
            <div style={{color:"#64748b",marginTop:8,fontSize:14}}>Securely loading checkout</div>
          </div>}
          {phase===2 && <div style={{textAlign:"center",padding:"10px 0"}}>
            <div style={{fontSize:44,marginBottom:10}}>⚠️</div>
            <div style={{fontSize:18,fontWeight:800,color:"#1e293b",marginBottom:8}}>
              Checkout Unavailable
            </div>
            <div style={{color:"#64748b",fontSize:13.5,lineHeight:1.6,marginBottom:22}}>
              {errMsg}
            </div>
            <button onClick={()=>setPhase(0)} style={{
              width:"100%",background:`linear-gradient(135deg,${cat.color},${cat.color}cc)`,
              color:"white",border:"none",borderRadius:12,padding:"13px",
              fontSize:15,fontWeight:800,cursor:"pointer",marginBottom:10,fontFamily:"inherit",
            }}>Try Again</button>
            <button onClick={onClose} style={{
              background:"none",border:"none",color:"#94a3b8",cursor:"pointer",
              fontSize:13,fontFamily:"inherit",
            }}>Close</button>
          </div>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   AI TUTOR CHAT MODAL — live Claude-powered tutor
   with voice input (speech-to-text) & voice output (text-to-speech)
══════════════════════════════════════════════ */
function cleanForSpeech(text){
  return text
    .replace(/\*\*(.*?)\*\*/g,"$1")
    .replace(/\*(.*?)\*/g,"$1")
    .replace(/#{1,6}\s/g,"")
    .replace(/`{1,3}([^`]*?)`{1,3}/g,"$1")
    .replace(/^[-•]\s+/gm,"")
    .replace(/\n+/g," ")
    .trim();
}

function TutorModal({c,onClose}) {
  const cat=CATS.find(x=>x.id===c.cat);
  const steps=Array.from({length:c.steps},(_,i)=>STEP_HEADS[i%STEP_HEADS.length]);
  const [messages,setMessages]=useState([
    {role:"assistant",text:`Hi! 👋 I'm your AI tutor for **${c.title}**. Ask me anything — type or tap the mic to talk — and I'll explain, give examples, or help if you're stuck. What would you like to know?`}
  ]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [voiceOn,setVoiceOn]=useState(true);
  const [speaking,setSpeaking]=useState(false);
  const [listening,setListening]=useState(false);
  const [voiceSupport,setVoiceSupport]=useState({stt:false,tts:false});
  const scrollRef=useRef(null);
  const recogRef=useRef(null);

  // Detect browser voice support
  useEffect(()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    setVoiceSupport({stt:!!SR,tts:!!window.speechSynthesis});
  },[]);

  useEffect(()=>{
    if(scrollRef.current) scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
  },[messages,loading]);

  // Stop any speech / listening when modal unmounts
  useEffect(()=>{
    return ()=>{
      if(window.speechSynthesis) window.speechSynthesis.cancel();
      if(recogRef.current) { try{recogRef.current.stop();}catch(e){} }
    };
  },[]);

  function speak(text){
    if(!voiceSupport.tts||!voiceOn) return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(cleanForSpeech(text));
    u.rate=1; u.pitch=1.02; u.volume=1;
    u.onstart=()=>setSpeaking(true);
    u.onend=()=>setSpeaking(false);
    u.onerror=()=>setSpeaking(false);
    window.speechSynthesis.speak(u);
  }
  function stopSpeaking(){
    if(window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  }
  function toggleVoice(){
    if(voiceOn) stopSpeaking();
    setVoiceOn(v=>!v);
  }

  function startListening(){
    if(!voiceSupport.stt||loading) return;
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    const recog=new SR();
    recog.lang="en-US"; recog.continuous=false; recog.interimResults=false;
    recog.onstart=()=>setListening(true);
    recog.onerror=()=>setListening(false);
    recog.onend=()=>setListening(false);
    recog.onresult=(e)=>{
      const transcript=e.results[0][0].transcript;
      send(transcript);
    };
    recogRef.current=recog;
    try{recog.start();}catch(e){setListening(false);}
  }
  function stopListening(){
    if(recogRef.current){ try{recogRef.current.stop();}catch(e){} }
    setListening(false);
  }

  async function send(text){
    const q=(text??input).trim();
    if(!q||loading) return;
    setInput("");
    setError(null);
    stopSpeaking();
    const newMsgs=[...messages,{role:"user",text:q}];
    setMessages(newMsgs);
    setLoading(true);
    try{
      const history=newMsgs.map(m=>({role:m.role,content:m.text}));
      const payload={
        model:"claude-sonnet-4-6",
        max_tokens:1000,
        system:`You are a warm, patient, encouraging tutor inside "LearnHub", helping a learner understand the course "${c.title}" (category: ${cat.label}). The course covers these steps: ${steps.join(", ")}. Explain things in plain, simple language with short concrete examples. Keep replies conversational and concise (suited for a small chat widget and for being read aloud — 2 to 5 short sentences, or a short numbered list). Never use complicated jargon without explaining it. If the learner seems stuck, break the idea into smaller pieces. If asked something unrelated to this course or to learning, gently steer back to the topic.`,
        messages:history,
      };

      // Try calling Anthropic directly first (this works inside the Claude.ai
      // preview/artifact sandbox, which injects auth automatically).
      // If that fails — e.g. because this is running on your own deployed
      // domain with no injected key — fall back to our own backend proxy
      // at /api/tutor, which holds the real API key securely server-side.
      let data;
      try{
        const direct=await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(payload),
        });
        if(!direct.ok) throw new Error("direct call failed");
        data=await direct.json();
      }catch(directErr){
        const proxied=await fetch("/api/tutor",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(payload),
        });
        if(!proxied.ok){
          const errBody=await proxied.json().catch(()=>({}));
          throw new Error(errBody.error||"proxy call failed");
        }
        data=await proxied.json();
      }
      const textOut=(data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n").trim();
      const finalText=textOut||"Sorry, I didn't quite catch that — could you rephrase your question?";
      setMessages(m=>[...m,{role:"assistant",text:finalText}]);
      speak(finalText);
    }catch(e){
      setError("Something went wrong reaching the AI tutor. Please try again.");
      const errText="⚠️ I had trouble responding just now. Could you try asking again?";
      setMessages(m=>[...m,{role:"assistant",text:errText}]);
    }finally{
      setLoading(false);
    }
  }

  const suggestions=["Explain step 1 again, simply","Give me a real example","I'm stuck — help me","Quiz me on this topic"];

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",
        backdropFilter:"blur(6px)",display:"flex",alignItems:"center",
        justifyContent:"center",zIndex:1000,padding:16,animation:"fadeIn .2s ease"}}>
      <div style={{background:"white",borderRadius:22,width:"100%",maxWidth:560,
        height:"min(680px, 92vh)",overflow:"hidden",boxShadow:"0 40px 80px rgba(0,0,0,.3)",
        display:"flex",flexDirection:"column",animation:"fadeUp .3s ease"}}>

        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${cat.color},${cat.color}aa)`,
          padding:"18px 22px",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{position:"relative",flexShrink:0}}>
                {speaking && [0,1].map(ring=>(
                  <div key={ring} style={{
                    position:"absolute",inset:-ring*6-4,borderRadius:"50%",
                    border:"2px solid rgba(255,255,255,.5)",
                    animation:`pulse 1.2s ease-in-out infinite`,animationDelay:`${ring*0.2}s`,
                  }}/>
                ))}
                <div style={{
                  width:42,height:42,background:"rgba(255,255,255,.2)",borderRadius:12,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
                  position:"relative",
                }}>🤖</div>
              </div>
              <div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.75)",fontWeight:800,
                  letterSpacing:"1px",marginBottom:3,display:"flex",alignItems:"center",gap:6}}>
                  AI TUTOR · LIVE CHAT
                  {speaking && <span style={{display:"flex",gap:2}}>
                    {[0,1,2].map(b=>(
                      <span key={b} style={{width:3,height:9,background:"#fff",borderRadius:2,
                        animation:"pulse .6s ease-in-out infinite",animationDelay:`${b*0.12}s`}}/>
                    ))}
                  </span>}
                </div>
                <div style={{fontSize:16,fontWeight:900,color:"white",lineHeight:1.25}}>{c.title}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:2}}>{cat.icon} {cat.label}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              {voiceSupport.tts && (
                <button onClick={toggleVoice} title={voiceOn?"Mute voice replies":"Enable voice replies"} style={{
                  background:"rgba(255,255,255,.2)",border:"none",
                  color:"white",width:30,height:30,borderRadius:8,cursor:"pointer",fontSize:14,
                  fontFamily:"inherit",
                }}>{voiceOn?"🔊":"🔇"}</button>
              )}
              <button onClick={onClose} style={{background:"rgba(255,255,255,.2)",border:"none",
                color:"white",width:30,height:30,borderRadius:8,cursor:"pointer",fontSize:18,
                fontFamily:"inherit"}}>×</button>
            </div>
          </div>
        </div>

        {/* Lesson steps strip */}
        <div style={{display:"flex",gap:6,overflowX:"auto",padding:"10px 16px",
          background:"#f8fafc",borderBottom:"1px solid #f1f5f9",flexShrink:0}}>
          {steps.map((s,i)=>(
            <button key={i} onClick={()=>send(`Can you explain "${s}" in this course, step by step?`)}
              style={{
                flexShrink:0,background:"white",border:`1px solid ${cat.color}33`,
                borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,
                color:cat.color,cursor:"pointer",whiteSpace:"nowrap",
              }}>{i+1}. {s}</button>
          ))}
        </div>

        {/* Chat messages */}
        <div ref={scrollRef} style={{flex:1,overflowY:"auto",padding:"18px 18px 6px",
          display:"flex",flexDirection:"column",gap:14,background:"#fcfcfb"}}>
          {messages.map((m,i)=>{
            const isLast=i===messages.length-1;
            const isSpeakingThis=isLast&&m.role==="assistant"&&speaking;
            return (
            <div key={i} style={{
              display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",
              animation:"fadeUp .25s ease",
            }}>
              {m.role==="assistant" && (
                <div style={{width:28,height:28,background:cat.bg,borderRadius:8,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:14,marginRight:8,flexShrink:0,
                  boxShadow:isSpeakingThis?`0 0 0 3px ${cat.color}44`:"none",
                  transition:"box-shadow .2s",
                }}>🤖</div>
              )}
              <div style={{
                maxWidth:"76%",padding:"10px 14px",borderRadius:14,
                background:m.role==="user"?`linear-gradient(135deg,${cat.color},${cat.color}cc)`:"white",
                color:m.role==="user"?"white":"#1e293b",
                fontSize:14,lineHeight:1.6,
                boxShadow:m.role==="user"?"none":"0 2px 8px rgba(0,0,0,.06)",
                border:m.role==="user"?"none":isSpeakingThis?`1px solid ${cat.color}55`:"1px solid #f1f5f9",
                whiteSpace:"pre-wrap",
              }}>{m.text}
                {m.role==="assistant" && voiceSupport.tts && (
                  <button onClick={()=>isSpeakingThis?stopSpeaking():speak(m.text)} style={{
                    marginLeft:8,background:"none",border:"none",cursor:"pointer",
                    fontSize:12,opacity:0.5,verticalAlign:"middle",
                  }} title={isSpeakingThis?"Stop":"Read aloud"}>{isSpeakingThis?"⏸":"🔊"}</button>
                )}
              </div>
            </div>
          );})}
          {loading && (
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:28,height:28,background:cat.bg,borderRadius:8,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🤖</div>
              <div style={{display:"flex",gap:4,padding:"12px 14px",background:"white",
                borderRadius:14,border:"1px solid #f1f5f9"}}>
                {[0,1,2].map(d=>(
                  <div key={d} style={{
                    width:6,height:6,borderRadius:"50%",background:cat.color,
                    animation:"pulse 1s ease-in-out infinite",animationDelay:`${d*0.15}s`,
                  }}/>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick suggestions */}
        <div style={{display:"flex",gap:6,padding:"10px 16px 0",flexWrap:"wrap",flexShrink:0}}>
          {suggestions.map(s=>(
            <button key={s} onClick={()=>send(s)} disabled={loading} style={{
              background:cat.bg,border:"none",borderRadius:16,padding:"5px 12px",
              fontSize:11,fontWeight:700,color:cat.color,cursor:loading?"default":"pointer",
              opacity:loading?0.5:1,
            }}>{s}</button>
          ))}
        </div>

        {/* Input row */}
        <div style={{display:"flex",gap:8,padding:"12px 16px",borderTop:"1px solid #f1f5f9",flexShrink:0,alignItems:"center"}}>
          {voiceSupport.stt && (
            <button
              onClick={listening?stopListening:startListening}
              disabled={loading}
              title={listening?"Stop listening":"Speak your question"}
              style={{
                position:"relative",flexShrink:0,
                width:42,height:42,borderRadius:12,border:"none",cursor:loading?"default":"pointer",
                background:listening?"#ef4444":cat.bg,
                color:listening?"white":cat.color,
                fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",
                opacity:loading?0.5:1,
              }}>
              {listening && [0,1].map(ring=>(
                <div key={ring} style={{
                  position:"absolute",inset:-4-ring*5,borderRadius:"50%",
                  border:"2px solid #ef444466",
                  animation:"pulse 1s ease-in-out infinite",animationDelay:`${ring*0.2}s`,
                }}/>
              ))}
              {listening?"⏹":"🎙️"}
            </button>
          )}
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!loading) send();}}
            placeholder={listening?"🎙️ Listening… speak now":"Ask your AI tutor anything about this course…"}
            disabled={listening}
            style={{
              flex:1,padding:"11px 14px",borderRadius:12,border:"1.5px solid #e2e8f0",
              fontSize:14,color:"#1e293b",background:listening?"#fef2f2":"#f8fafc",
              fontFamily:"'Nunito',sans-serif",
            }}/>
          <button onClick={()=>send()} disabled={loading||!input.trim()} style={{
            background:loading||!input.trim()?"#cbd5e1":`linear-gradient(135deg,${cat.color},${cat.color}cc)`,
            color:"white",border:"none",borderRadius:12,padding:"0 20px",height:42,
            fontSize:14,fontWeight:800,cursor:loading||!input.trim()?"default":"pointer",
            fontFamily:"inherit",flexShrink:0,
          }}>Send</button>
        </div>
        {!voiceSupport.stt && (
          <div style={{textAlign:"center",fontSize:11,color:"#94a3b8",padding:"0 16px 10px"}}>
            🎙️ Voice input isn't supported in this browser — try Chrome or Edge for talking to your tutor.
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [q,setQ]=useState("");
  const [cat,setCat]=useState("all");
  const [sort,setSort]=useState("default");
  const [pg,setPg]=useState(1);
  const [buying,setBuying]=useState(null);
  const [owned,setOwned]=useState(new Set());
  const [tutoring,setTutoring]=useState(null);
  const [section,setSection]=useState("home"); // home | courses
  const [subBanner,setSubBanner]=useState(null); // {title} | {error} | null
  const PER=24;

  // After returning from Stripe Checkout, confirm the subscription is
  // really active before unlocking the course. Cleans the URL afterward.
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const sessionId=params.get("session_id");
    const subscribedId=params.get("subscribed");
    const canceledId=params.get("checkout_canceled");
    const previewCode=params.get("preview");

    // OWNER TESTING UNLOCK — visit yoursite.com/?preview=learnhub2026
    // to instantly unlock every course's AI Tutor for testing, with no
    // payment and no Stripe checkout at all. Change "learnhub2026" to
    // your own secret word below if you'd like. This is meant only for
    // you to test with — don't share this link publicly.
    if(previewCode==="learnhub2026"){
      setOwned(new Set(ALL.map(c=>c.id)));
      window.history.replaceState({},"",window.location.pathname);
      return;
    }

    if(sessionId){
      fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
        .then(r=>r.json())
        .then(data=>{
          const courseId=Number(data.courseId||subscribedId);
          const course=ALL.find(c=>c.id===courseId);
          if(data.active&&course){
            setOwned(s=>new Set([...s,courseId]));
            setSubBanner({type:"success",title:course.title,course});
          }else{
            setSubBanner({type:"error",message:"We couldn't confirm that subscription. If you were charged, please contact support."});
          }
        })
        .catch(()=>{
          setSubBanner({type:"error",message:"We couldn't verify your subscription right now. Please refresh in a moment."});
        })
        .finally(()=>{
          window.history.replaceState({},"",window.location.pathname);
        });
    }else if(canceledId){
      window.history.replaceState({},"",window.location.pathname);
    }
  },[]);

  const counts=useMemo(()=>{
    const m={};CATS.forEach(c=>{m[c.id]=ALL.filter(x=>x.cat===c.id).length;});return m;
  },[]);

  const list=useMemo(()=>{
    let l=ALL;
    if(cat!=="all") l=l.filter(c=>c.cat===cat);
    if(q.trim()){const t=q.toLowerCase();l=l.filter(c=>c.title.toLowerCase().includes(t)||c.cat.includes(t));}
    if(sort==="rating") l=[...l].sort((a,b)=>b.rating-a.rating);
    if(sort==="pop") l=[...l].sort((a,b)=>b.students-a.students);
    if(sort==="az") l=[...l].sort((a,b)=>a.title.localeCompare(b.title));
    return l;
  },[q,cat,sort]);

  const totalPg=Math.ceil(list.length/PER);
  const pageItems=list.slice((pg-1)*PER,pg*PER);

  const goSearch=(v)=>{setQ(v);setPg(1);setSection("courses");};
  const chooseCat=(id)=>{setCat(id);setPg(1);setSection("courses");};

  const featuredCats=CATS.slice(0,6);
  const topCourses=ALL.filter(c=>c.rating>=4.8).slice(0,8);

  return (
    <div style={{minHeight:"100vh",background:"#f0f4f8",fontFamily:"'Nunito','Segoe UI',sans-serif"}}>
      <style>{GLOBAL_CSS}</style>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav style={{
        background:"rgba(255,255,255,.92)",backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(226,232,240,.8)",
        position:"sticky",top:0,zIndex:200,
        boxShadow:"0 2px 20px rgba(0,0,0,.07)",
      }}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 20px",
          height:64,display:"flex",alignItems:"center",gap:16}}>
          {/* Logo */}
          <div onClick={()=>setSection("home")} style={{
            display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0,
          }}>
            <div style={{
              width:40,height:40,
              background:"linear-gradient(135deg,#2563eb,#6366f1)",
              borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:20,boxShadow:"0 4px 12px rgba(37,99,235,.35)",
            }}>🎓</div>
            <div>
              <div style={{fontSize:19,fontWeight:900,color:"#0f172a",lineHeight:1}}>LearnHub</div>
              <div style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:"0.5px"}}>
                1,200+ COURSES · $5/MO EACH
              </div>
            </div>
          </div>
          {/* Search */}
          <div style={{flex:1,maxWidth:500,position:"relative"}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",
              fontSize:15,pointerEvents:"none"}}>🔍</span>
            <input value={q} onChange={e=>goSearch(e.target.value)}
              placeholder="Search Excel, Python, Photoshop, Word…"
              style={{width:"100%",padding:"9px 14px 9px 38px",borderRadius:12,
                border:"1.5px solid #e2e8f0",fontSize:14,background:"#f8fafc",
                color:"#1e293b",fontFamily:"'Nunito',sans-serif"}}/>
          </div>
          {/* Nav buttons */}
          <div style={{display:"flex",gap:8,flexShrink:0}}>
            <button onClick={()=>setSection("home")} style={{
              padding:"7px 14px",borderRadius:10,border:"none",fontFamily:"inherit",
              background:section==="home"?"#eff6ff":"transparent",
              color:section==="home"?"#2563eb":"#64748b",fontWeight:700,fontSize:13,cursor:"pointer",
            }}>Home</button>
            <button onClick={()=>setSection("courses")} style={{
              padding:"7px 14px",borderRadius:10,border:"none",fontFamily:"inherit",
              background:section==="courses"?"#eff6ff":"transparent",
              color:section==="courses"?"#2563eb":"#64748b",fontWeight:700,fontSize:13,cursor:"pointer",
            }}>All Courses</button>
            {owned.size>0 && (
              <div style={{
                background:"#dcfce7",border:"1.5px solid #16a34a33",borderRadius:10,
                padding:"5px 12px",fontSize:12,fontWeight:800,color:"#15803d",
              }}>✓ {owned.size} Subscribed</div>
            )}
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
         HOME PAGE
      ══════════════════════════════════════════════ */}
      {section==="home" && <>

        {/* ── HERO ──────────────────────────────────────── */}
        <div style={{
          background:"linear-gradient(135deg,#1e40af 0%,#3b82f6 55%,#6366f1 100%)",
          padding:"60px 20px 80px",position:"relative",overflow:"hidden",
        }}>
          {/* Animated blobs */}
          {[
            {w:400,h:400,top:-120,left:-80,c:"rgba(255,255,255,0.04)"},
            {w:300,h:300,top:40,right:-60,c:"rgba(255,255,255,0.05)"},
            {w:250,h:250,bottom:-80,left:"35%",c:"rgba(255,255,255,0.06)"},
          ].map((b,i)=>(
            <div key={i} style={{position:"absolute",width:b.w,height:b.h,background:b.c,
              borderRadius:"50%",top:b.top,left:b.left,right:b.right,bottom:b.bottom,
              animation:`float ${4+i}s ease-in-out infinite`}}/>
          ))}
          {/* Grid pattern overlay */}
          <div style={{position:"absolute",inset:0,opacity:.04,
            backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
            backgroundSize:"40px 40px"}}/>

          <div style={{maxWidth:1300,margin:"0 auto",position:"relative",
            display:"flex",alignItems:"center",gap:48,flexWrap:"wrap"}}>
            {/* Left text */}
            <div style={{flex:"1 1 380px",animation:"fadeUp .6s ease"}}>
              <div style={{
                display:"inline-block",background:"rgba(255,255,255,.15)",
                border:"1.5px solid rgba(255,255,255,.3)",color:"white",
                padding:"7px 18px",borderRadius:24,fontSize:13,fontWeight:800,
                letterSpacing:"0.8px",marginBottom:22,
              }}>🎉 1,200+ PRACTICAL COURSES · $5/MO EACH · 🤖 AI COURSES NOW LIVE</div>
              <h1 style={{
                fontSize:"clamp(30px,5vw,56px)",fontWeight:900,color:"white",
                lineHeight:1.1,marginBottom:18,
                textShadow:"0 2px 24px rgba(0,0,0,.2)",
              }}>
                Learn Any Skill<br/>
                <span style={{color:"#fbbf24"}}>Step by Step</span>
              </h1>
              <p style={{
                fontSize:17,color:"rgba(255,255,255,.85)",lineHeight:1.7,
                marginBottom:32,maxWidth:460,
              }}>
                Chat live with an AI Tutor — by typing or talking — on Excel, Word, Python,
                Photoshop, <strong style={{color:"#fbbf24"}}>ChatGPT, Claude, Kling AI</strong> &amp; more.
                Plain language, real answers, available the moment you ask — from day one.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button onClick={()=>setSection("courses")} style={{
                  background:"white",color:"#2563eb",border:"none",borderRadius:14,
                  padding:"14px 28px",fontSize:16,fontWeight:900,cursor:"pointer",
                  boxShadow:"0 8px 24px rgba(0,0,0,.2)",
                  fontFamily:"'Nunito',sans-serif",
                  animation:"pulse 2s ease-in-out 3s 4",
                }}>Browse All Courses →</button>
                <button onClick={()=>chooseCat("aiprompt")} style={{
                  background:"rgba(255,255,255,.15)",color:"white",
                  border:"1.5px solid rgba(255,255,255,.4)",borderRadius:14,
                  padding:"14px 28px",fontSize:16,fontWeight:800,cursor:"pointer",
                  fontFamily:"'Nunito',sans-serif",
                }}>🤖 Explore AI Courses ✨</button>
              </div>
            </div>

            {/* Right: floating course cards preview */}
            <div style={{flex:"1 1 280px",position:"relative",minHeight:280,
              display:"flex",justifyContent:"center",alignItems:"center"}}>
              {/* Floating mini cards */}
              {[
                {cat:CATS.find(c=>c.id==="excel"),title:"VLOOKUP Made Simple",off:{top:0,left:0},cls:"hero-float",delay:"0s"},
                {cat:CATS.find(c=>c.id==="aiprompt"),title:"Chain of Thought Prompting",off:{top:80,right:0},cls:"hero-float-b",delay:"1s"},
                {cat:CATS.find(c=>c.id==="chatgpt"),title:"Build Your Own Custom GPT",off:{bottom:0,left:30},cls:"hero-float",delay:"0.5s"},
              ].map((fc,i)=>(
                <div key={i} className={fc.cls} style={{
                  position:"absolute",...fc.off,
                  background:"white",borderRadius:14,padding:"14px 18px",
                  boxShadow:"0 12px 40px rgba(0,0,0,.2)",minWidth:180,maxWidth:200,
                  animationDelay:fc.delay,
                }}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <span style={{fontSize:20}}>{fc.cat.icon}</span>
                    <span style={{fontSize:11,fontWeight:800,color:fc.cat.color,
                      textTransform:"uppercase",letterSpacing:"0.5px"}}>{fc.cat.label}</span>
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:"#0f172a",
                    marginBottom:8,lineHeight:1.3}}>{fc.title}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Stars r={4.9} size={11}/>
                    <span style={{background:"#dcfce7",color:"#16a34a",fontWeight:900,
                      fontSize:12,padding:"2px 8px",borderRadius:8}}>$5/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div style={{maxWidth:1300,margin:"48px auto 0",
            display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            {[
              {icon:"📚",end:1200,suffix:"+",label:"Courses"},
              {icon:"💵",end:5,suffix:"/mo",prefix:"$",label:"Per Course"},
              {icon:"📄",end:15,suffix:"",label:"Categories"},
              {icon:"⭐",end:48,suffix:"%",label:"Rated 4.8+"},
              {icon:"👥",end:25000,suffix:"+",label:"Learners"},
            ].map(s=>(
              <div key={s.label} style={{
                background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",
                borderRadius:16,padding:"16px 20px",color:"white",textAlign:"center",
                minWidth:100,backdropFilter:"blur(8px)",
              }}>
                <div style={{fontSize:22}}>{s.icon}</div>
                <div style={{fontSize:22,fontWeight:900}}>
                  {s.prefix}<Counter end={s.end} suffix={s.suffix}/>
                </div>
                <div style={{fontSize:11,opacity:.75,fontWeight:700}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MARQUEE STRIP ─────────────────────────────── */}
        <div style={{background:"#0f172a",padding:"12px 0",overflow:"hidden"}}>
          <div style={{display:"flex",animation:"marqueeL 20s linear infinite",whiteSpace:"nowrap"}}>
            {[...CATS,...CATS].map((c,i)=>(
              <span key={i} style={{
                display:"inline-flex",alignItems:"center",gap:6,
                color:"rgba(255,255,255,.7)",fontSize:13,fontWeight:700,
                padding:"0 28px",
              }}>
                {c.icon} {c.label} <span style={{color:"#fbbf24",marginLeft:6}}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── AI SPOTLIGHT BANNER ───────────────────────── */}
        <div style={{
          background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",
          padding:"56px 20px",position:"relative",overflow:"hidden",
        }}>
          {/* animated sparkle dots */}
          {[
            {w:6,h:6,top:"15%",left:"8%",c:"#a78bfa",delay:"0s"},
            {w:4,h:4,top:"70%",left:"15%",c:"#60a5fa",delay:"0.5s"},
            {w:8,h:8,top:"30%",left:"45%",c:"#f472b6",delay:"1s"},
            {w:5,h:5,top:"80%",left:"60%",c:"#34d399",delay:"1.5s"},
            {w:6,h:6,top:"20%",right:"10%",c:"#fbbf24",delay:"0.8s"},
            {w:4,h:4,top:"60%",right:"20%",c:"#a78bfa",delay:"0.3s"},
          ].map((d,i)=>(
            <div key={i} style={{
              position:"absolute",width:d.w,height:d.h,background:d.c,
              borderRadius:"50%",top:d.top,left:d.left,right:d.right,
              boxShadow:`0 0 8px ${d.c}`,
              animation:`float ${3+i*0.4}s ease-in-out infinite`,
              animationDelay:d.delay,
            }}/>
          ))}
          <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
            {/* Header */}
            <div style={{textAlign:"center",marginBottom:40}}>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:8,
                background:"linear-gradient(135deg,#7c3aed,#6d28d9)",
                color:"white",padding:"7px 20px",borderRadius:24,
                fontSize:12,fontWeight:800,letterSpacing:"1px",marginBottom:16,
                boxShadow:"0 4px 20px rgba(124,58,237,.4)",
              }}>✨ BRAND NEW · AI COURSES ADDED</div>
              <h2 style={{
                fontSize:"clamp(24px,4vw,42px)",fontWeight:900,color:"white",
                marginBottom:12,lineHeight:1.15,
              }}>Learn AI Tools That Are<br/>
                <span style={{
                  background:"linear-gradient(135deg,#a78bfa,#60a5fa,#f472b6)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                }}>Changing the World</span>
              </h2>
              <p style={{fontSize:16,color:"rgba(255,255,255,.65)",maxWidth:520,margin:"0 auto"}}>
                150+ new guides on ChatGPT, Claude, Gemini, Kling, Midjourney,
                Hostinger Horizons & every major AI tool — all just $5/month each.
              </p>
            </div>

            {/* 3 AI Category Cards */}
            <div style={{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center",marginBottom:36}}>
              {CATS.filter(c=>["aiprompt","chatgpt","aicreative"].includes(c.id)).map((c,i)=>(
                <div key={c.id} onClick={()=>chooseCat(c.id)}
                  style={{
                    flex:"1 1 280px",maxWidth:360,borderRadius:20,overflow:"hidden",
                    cursor:"pointer",
                    boxShadow:"0 8px 32px rgba(0,0,0,.4)",
                    transition:"transform .22s ease, box-shadow .22s ease",
                    animation:"fadeUp .5s ease",animationDelay:`${i*120}ms`,animationFillMode:"both",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 48px rgba(0,0,0,.5)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.4)";}}>
                  <div style={{position:"relative",height:140,overflow:"hidden"}}>
                    <img src={c.img} alt={c.label} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div style={{position:"absolute",inset:0,
                      background:`linear-gradient(135deg,${c.color}ee,${c.color}99)`}}/>
                    <div style={{position:"absolute",top:14,left:14,display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:28}}>{c.icon}</span>
                      <div>
                        <div style={{fontSize:14,fontWeight:900,color:"white"}}>{c.label}</div>
                        <div style={{
                          background:"rgba(255,255,255,.2)",color:"white",
                          padding:"2px 8px",borderRadius:8,fontSize:10,fontWeight:800,
                          display:"inline-block",marginTop:3,letterSpacing:"0.5px",
                        }}>✨ NEW CATEGORY</div>
                      </div>
                    </div>
                    <div style={{
                      position:"absolute",bottom:12,right:12,
                      background:"white",color:c.color,
                      fontWeight:900,fontSize:13,padding:"4px 12px",borderRadius:10,
                    }}>{counts[c.id]} courses</div>
                  </div>
                  <div style={{
                    background:"rgba(255,255,255,.06)",backdropFilter:"blur(10px)",
                    padding:"14px 18px",borderTop:"1px solid rgba(255,255,255,.1)",
                  }}>
                    <div style={{color:"rgba(255,255,255,.8)",fontSize:13,marginBottom:10,lineHeight:1.5}}>{c.desc}</div>
                    <div style={{
                      color:c.color,background:`${c.color}22`,
                      border:`1px solid ${c.color}44`,
                      padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:800,
                      textAlign:"center",
                    }}>Explore {c.label} →</div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI tool logos strip */}
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.4)",
                letterSpacing:"1.5px",marginBottom:16,textTransform:"uppercase"}}>Tools Covered</div>
              <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                {[
                  {e:"💬",n:"ChatGPT"},{e:"🤖",n:"Claude"},{e:"🔵",n:"Gemini"},
                  {e:"🎬",n:"Kling AI"},{e:"🏠",n:"Horizons"},{e:"🎨",n:"Midjourney"},
                  {e:"🎥",n:"Runway"},{e:"🔊",n:"ElevenLabs"},{e:"🖼️",n:"DALL-E"},
                  {e:"🎵",n:"Suno AI"},{e:"🧠",n:"Perplexity"},{e:"⚡",n:"Copilot"},
                ].map(t=>(
                  <div key={t.n} style={{
                    background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",
                    borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:6,
                    color:"rgba(255,255,255,.8)",fontSize:13,fontWeight:700,
                  }}>{t.e} {t.n}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ──────────────────────────────── */}
        <div style={{maxWidth:1100,margin:"64px auto",padding:"0 20px"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{
              display:"inline-block",background:"#eff6ff",color:"#2563eb",
              padding:"6px 18px",borderRadius:20,fontSize:12,fontWeight:800,
              letterSpacing:"1px",marginBottom:14,
            }}>HOW IT WORKS</div>
            <h2 style={{fontSize:"clamp(22px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:12}}>
              From Purchase to Learning in 3 Steps
            </h2>
            <p style={{color:"#64748b",fontSize:16,maxWidth:480,margin:"0 auto"}}>
              Getting hands-on help is fast, simple, and affordable.
            </p>
          </div>
          <div style={{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center"}}>
            {[
              {num:"01",icon:"🔍",title:"Find Your Course",desc:"Browse 1,200+ guides across Excel, Word, Python, ChatGPT, Claude, Photoshop and more. Search or filter by category."},
              {num:"02",icon:"💳",title:"Subscribe for $5/mo",desc:"Less than a streaming subscription. Instant checkout with your card, cancel anytime."},
              {num:"03",icon:"💬",title:"Chat, Talk & Learn",desc:"Open the live AI Tutor — type or talk and get real answers out loud, for as long as you need."},
            ].map((s,i)=>(
              <div key={i} style={{
                flex:"1 1 260px",background:"white",borderRadius:20,padding:"32px 28px",
                boxShadow:"0 4px 20px rgba(0,0,0,.07)",
                animation:"fadeUp .5s ease",animationDelay:`${i*150}ms`,animationFillMode:"both",
                position:"relative",overflow:"hidden",
              }}>
                <div style={{
                  position:"absolute",top:-16,right:-16,width:80,height:80,
                  background:"#eff6ff",borderRadius:"50%",opacity:.6,
                }}/>
                <div style={{
                  width:52,height:52,background:"linear-gradient(135deg,#2563eb,#6366f1)",
                  borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:24,marginBottom:18,boxShadow:"0 6px 16px rgba(37,99,235,.3)",
                }}>{s.icon}</div>
                <div style={{fontSize:11,fontWeight:800,color:"#3b82f6",letterSpacing:"1px",marginBottom:8}}>
                  STEP {s.num}
                </div>
                <div style={{fontSize:18,fontWeight:900,color:"#0f172a",marginBottom:10}}>{s.title}</div>
                <div style={{fontSize:14,color:"#64748b",lineHeight:1.7}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHO IT'S FOR ──────────────────────────────── */}
        <div style={{background:"#fefce8",padding:"64px 20px"}}>
          <div style={{maxWidth:1200,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:40}}>
              <div style={{
                display:"inline-block",background:"#dcfce7",color:"#15803d",
                padding:"6px 18px",borderRadius:20,fontSize:12,fontWeight:800,
                letterSpacing:"1px",marginBottom:14,
              }}>WHO IT'S FOR</div>
              <h2 style={{fontSize:"clamp(22px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:12}}>
                Built for Anyone Who Wants<br/>Practical Skills, Fast
              </h2>
              <p style={{color:"#64748b",fontSize:16,maxWidth:560,margin:"0 auto"}}>
                No matter where you're starting from, there's a guide here that
                solves a real problem you're facing today.
              </p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18}}>
              {[
                {icon:"🧑‍💼",title:"Office & Admin Professionals",
                  desc:"Get faster at Excel, Word, and PowerPoint so daily tasks take minutes instead of hours — and your reports look more polished.",
                  tags:["Excel","Word","PowerPoint"]},
                {icon:"🎓",title:"Students & Learners",
                  desc:"Pick up Python, typing, AI tools, and internet basics without paying for tutoring or a bootcamp you don't need yet.",
                  tags:["Python","Typing","AI & Prompting"]},
                {icon:"💼",title:"Job Seekers & Career Switchers",
                  desc:"Build the exact computer skills employers expect — Excel, data entry, accounting basics — without months of unpaid study.",
                  tags:["Excel","Data Entry","Accounting"]},
                {icon:"🏪",title:"Small Business Owners & Freelancers",
                  desc:"Handle invoicing, bookkeeping, and AI-powered marketing content yourself instead of hiring it out.",
                  tags:["Accounting","ChatGPT","Google Workspace"]},
                {icon:"👵",title:"Tech Beginners",
                  desc:"Plain-language guides for email, Windows, and the internet — written for people who've never had anyone explain it simply.",
                  tags:["Windows","Internet & Email","Typing"]},
                {icon:"🎨",title:"Creators & Marketers",
                  desc:"Use Photoshop, ChatGPT, Midjourney, and Kling AI to produce content that used to require an agency.",
                  tags:["Photoshop","AI Creative Tools","ChatGPT"]},
                {icon:"🌍",title:"Remote & Hybrid Workers",
                  desc:"Get genuinely fluent in the everyday tools of remote work — Google Meet, spreadsheets, AI assistants — not just the basics.",
                  tags:["Google Workspace","Networking","AI & Prompting"]},
                {icon:"👩‍🏫",title:"Teachers & Trainers",
                  desc:"Hand learners a ready-made, clearly explained guide instead of writing your own training material from scratch.",
                  tags:["Google Workspace","PowerPoint","Internet & Email"]},
              ].map((p,i)=>(
                <div key={p.title} style={{
                  background:"white",borderRadius:18,padding:"26px 24px",
                  boxShadow:"0 4px 18px rgba(0,0,0,.06)",
                  animation:"fadeUp .5s ease",animationDelay:`${i*70}ms`,animationFillMode:"both",
                  border:"1px solid #f1f5f9",
                }}>
                  <div style={{fontSize:34,marginBottom:14}}>{p.icon}</div>
                  <div style={{fontSize:16,fontWeight:900,color:"#0f172a",marginBottom:8,lineHeight:1.3}}>
                    {p.title}
                  </div>
                  <div style={{fontSize:13.5,color:"#64748b",lineHeight:1.65,marginBottom:14}}>
                    {p.desc}
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {p.tags.map(t=>(
                      <span key={t} style={{
                        background:"#eff6ff",color:"#2563eb",borderRadius:8,
                        padding:"3px 9px",fontSize:11,fontWeight:700,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Why it actually helps */}
            <div style={{
              marginTop:48,background:"white",borderRadius:20,
              padding:"36px 32px",boxShadow:"0 4px 20px rgba(0,0,0,.06)",
            }}>
              <div style={{textAlign:"center",marginBottom:28}}>
                <div style={{fontSize:18,fontWeight:900,color:"#0f172a",marginBottom:6}}>
                  Why It Actually Helps
                </div>
                <div style={{fontSize:14,color:"#64748b"}}>
                  Not just cheap — designed to remove every excuse not to learn
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20}}>
                {[
                  {icon:"💵",t:"Less than a streaming plan",d:"$5/month per topic — try something new without the cost of a full course or bootcamp."},
                  {icon:"⏱",t:"15–40 minutes per session",d:"Short enough to finish on a lunch break, focused enough to actually stick."},
                  {icon:"🗣",t:"Plain language, always",d:"No assumed knowledge, no unexplained jargon — written so it just makes sense."},
                  {icon:"🤖",t:"AI Tutor on demand",d:"Stuck on a step? Ask the live AI tutor by typing or talking — get an answer immediately."},
                  {icon:"🔓",t:"Cancel anytime",d:"Subscribe to only the courses you need — drop one whenever you're done, no questions asked."},
                  {icon:"🔄",t:"1,200+ topics, one place",d:"Stop hunting across YouTube and forums — find the exact skill you need here."},
                ].map(f=>(
                  <div key={f.t} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{
                      width:40,height:40,background:"#f0fdf4",borderRadius:10,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:18,flexShrink:0,
                    }}>{f.icon}</div>
                    <div>
                      <div style={{fontSize:14,fontWeight:800,color:"#0f172a",marginBottom:3}}>{f.t}</div>
                      <div style={{fontSize:12.5,color:"#64748b",lineHeight:1.55}}>{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CATEGORIES SHOWCASE ───────────────────────── */}
        <div style={{background:"white",padding:"64px 20px"}}>
          <div style={{maxWidth:1300,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:40}}>
              <div style={{
                display:"inline-block",background:"#fef3c7",color:"#d97706",
                padding:"6px 18px",borderRadius:20,fontSize:12,fontWeight:800,
                letterSpacing:"1px",marginBottom:14,
              }}>CATEGORIES</div>
              <h2 style={{fontSize:"clamp(22px,4vw,36px)",fontWeight:900,color:"#0f172a",marginBottom:10}}>
                What Do You Want to Learn?
              </h2>
              <p style={{color:"#64748b",fontSize:16,maxWidth:480,margin:"0 auto"}}>
                15 categories · 1,200+ interactive courses · AI courses just added ✨
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
              {CATS.map((c,i)=>(
                <div key={c.id}
                  style={{animation:"fadeUp .4s ease",animationDelay:`${i*60}ms`,animationFillMode:"both"}}>
                  <CatCard cat={c} count={counts[c.id]} active={false}
                    onClick={()=>chooseCat(c.id)}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TOP-RATED COURSES ─────────────────────────── */}
        <div style={{maxWidth:1300,margin:"64px auto",padding:"0 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontSize:12,fontWeight:800,color:"#f59e0b",letterSpacing:"1px",marginBottom:6}}>⭐ TOP RATED</div>
              <h2 style={{fontSize:"clamp(20px,3.5vw,32px)",fontWeight:900,color:"#0f172a"}}>
                Most Popular Courses
              </h2>
            </div>
            <button onClick={()=>setSection("courses")} style={{
              background:"linear-gradient(135deg,#2563eb,#6366f1)",color:"white",
              border:"none",borderRadius:12,padding:"10px 22px",fontSize:14,
              fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",
              boxShadow:"0 4px 16px rgba(37,99,235,.3)",
            }}>View All 1,200+ →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
            {topCourses.map((c,i)=>(
              <Card key={c.id} c={c} onBuy={setBuying} owned={owned.has(c.id)} delay={i*60} onTutor={setTutoring}/>
            ))}
          </div>
        </div>

        {/* ── WHAT YOU GET (AI Tutor Preview) ─────────────── */}
        <div style={{background:"linear-gradient(135deg,#1e40af,#3b82f6)",padding:"64px 20px"}}>
          <div style={{maxWidth:1100,margin:"0 auto",
            display:"flex",gap:48,alignItems:"center",flexWrap:"wrap"}}>
            {/* Left */}
            <div style={{flex:"1 1 300px",color:"white"}}>
              <div style={{
                display:"inline-block",background:"rgba(255,255,255,.15)",
                border:"1px solid rgba(255,255,255,.25)",color:"white",
                padding:"6px 16px",borderRadius:20,fontSize:12,fontWeight:800,
                letterSpacing:"1px",marginBottom:20,
              }}>✨ WHAT YOU GET</div>
              <h2 style={{fontSize:"clamp(22px,4vw,38px)",fontWeight:900,lineHeight:1.15,marginBottom:16}}>
                Learn by Asking, Not Just Reading
              </h2>
              <p style={{fontSize:16,opacity:.85,lineHeight:1.7,marginBottom:28}}>
                Open the live AI Tutor and ask anything — by typing or talking
                out loud. It already knows your course, so you never have to
                re-explain context, and there's no limit on how many questions you ask.
              </p>
              {[
                {icon:"💬",t:"Live Conversation","d":"Ask questions by typing or speaking — get real answers instantly"},
                {icon:"🎙️",t:"Talks Back Too","d":"Hear every answer read aloud, or mute it and just read"},
                {icon:"🧠",t:"Knows Your Course","d":"Already familiar with every step, so you never start from zero"},
                {icon:"♾️",t:"Unlimited Questions","d":"Keep asking until it actually clicks — no limit, ever"},
              ].map(f=>(
                <div key={f.t} style={{display:"flex",gap:14,marginBottom:16,alignItems:"flex-start"}}>
                  <div style={{width:40,height:40,background:"rgba(255,255,255,.15)",
                    borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:18,flexShrink:0}}>{f.icon}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:15,marginBottom:2}}>{f.t}</div>
                    <div style={{fontSize:13,opacity:.75}}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right: mock AI Tutor chat preview */}
            <div style={{flex:"1 1 300px",display:"flex",justifyContent:"center"}}>
              <div className="hero-float" style={{
                background:"white",borderRadius:20,overflow:"hidden",
                boxShadow:"0 24px 64px rgba(0,0,0,.3)",maxWidth:340,width:"100%",
              }}>
                {/* Chat header mock */}
                <div style={{
                  background:"linear-gradient(135deg,#16a34a,#15803d)",
                  padding:"18px 20px",display:"flex",alignItems:"center",gap:12,
                }}>
                  <div style={{width:38,height:38,background:"rgba(255,255,255,.2)",borderRadius:10,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🤖</div>
                  <div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.75)",fontWeight:800,letterSpacing:"1px"}}>
                      AI TUTOR · LIVE CHAT
                    </div>
                    <div style={{fontSize:15,fontWeight:900,color:"white"}}>VLOOKUP Made Simple</div>
                  </div>
                </div>
                {/* Chat bubbles mock */}
                <div style={{padding:"16px 18px",display:"flex",flexDirection:"column",gap:10,background:"#fcfcfb"}}>
                  <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                    <div style={{width:24,height:24,background:"#dcfce7",borderRadius:7,
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>🤖</div>
                    <div style={{background:"white",borderRadius:12,padding:"9px 12px",fontSize:12.5,
                      color:"#1e293b",border:"1px solid #f1f5f9",lineHeight:1.5,maxWidth:"82%"}}>
                      Hi! I'm your AI tutor for VLOOKUP. Ask me anything — type or talk!
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div style={{background:"linear-gradient(135deg,#16a34a,#15803d)",color:"white",
                      borderRadius:12,padding:"9px 12px",fontSize:12.5,maxWidth:"75%"}}>
                      🎙️ Can you explain step 3 again?
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                    <div style={{width:24,height:24,background:"#dcfce7",borderRadius:7,
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>🤖</div>
                    <div style={{background:"white",borderRadius:12,padding:"9px 12px",fontSize:12.5,
                      color:"#1e293b",border:"1px solid #f1f5f9",lineHeight:1.5,maxWidth:"82%"}}>
                      Sure! Step 3 matches a value across columns — think of it as a lookup table. 🔊
                    </div>
                  </div>
                </div>
                {/* Input mock */}
                <div style={{padding:"12px 16px",borderTop:"1px solid #f1f5f9",display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{width:34,height:34,background:"#dcfce7",borderRadius:9,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🎙️</div>
                  <div style={{flex:1,background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,
                    padding:"8px 12px",fontSize:12,color:"#94a3b8"}}>Ask your AI tutor anything…</div>
                  <div style={{background:"linear-gradient(135deg,#16a34a,#15803d)",color:"white",
                    borderRadius:9,padding:"8px 14px",fontSize:12,fontWeight:800}}>Send</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TESTIMONIALS ──────────────────────────────── */}
        <div style={{background:"#f0f4f8",padding:"64px 20px"}}>
          <div style={{maxWidth:1200,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:40}}>
              <div style={{
                display:"inline-block",background:"#fce7f3",color:"#be185d",
                padding:"6px 18px",borderRadius:20,fontSize:12,fontWeight:800,
                letterSpacing:"1px",marginBottom:14,
              }}>⭐ LEARNER REVIEWS</div>
              <h2 style={{fontSize:"clamp(22px,4vw,34px)",fontWeight:900,color:"#0f172a"}}>
                What Our Learners Say
              </h2>
            </div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
              {TESTIMONIALS.map((t,i)=>(
                <div key={i} style={{
                  background:"white",borderRadius:18,padding:"24px 22px",
                  boxShadow:"0 4px 20px rgba(0,0,0,.06)",
                  flex:"1 1 200px",maxWidth:240,
                  animation:"fadeUp .5s ease",animationDelay:`${i*100}ms`,animationFillMode:"both",
                }}>
                  <div style={{color:"#fbbf24",fontSize:16,marginBottom:12}}>
                    {"★".repeat(t.stars)}
                  </div>
                  <p style={{fontSize:13,color:"#475569",lineHeight:1.65,
                    marginBottom:16,fontStyle:"italic"}}>"{t.text}"</p>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:36,height:36,background:"#eff6ff",borderRadius:"50%",
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:"#0f172a"}}>{t.name}</div>
                      <div style={{fontSize:11,color:"#94a3b8"}}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ────────────────────────────────── */}
        <div style={{
          background:"linear-gradient(135deg,#0f172a,#1e293b)",
          padding:"64px 20px",textAlign:"center",
        }}>
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{fontSize:48,marginBottom:16,animation:"float 3s ease-in-out infinite"}}>🚀</div>
            <h2 style={{fontSize:"clamp(24px,4vw,40px)",fontWeight:900,color:"white",marginBottom:14}}>
              Start Learning Today
            </h2>
            <p style={{fontSize:16,color:"rgba(255,255,255,.7)",lineHeight:1.7,marginBottom:32}}>
              1,200+ interactive courses on Excel, Word, Python, ChatGPT, Claude, Kling AI &amp; more.
              Each one just $5/month. No long-term contract — subscribe to exactly what you need, cancel anytime.
            </p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:28}}>
              <button onClick={()=>setSection("courses")} style={{
                background:"linear-gradient(135deg,#3b82f6,#6366f1)",color:"white",
                border:"none",borderRadius:14,padding:"15px 32px",fontSize:17,
                fontWeight:900,cursor:"pointer",fontFamily:"'Nunito',sans-serif",
                boxShadow:"0 8px 28px rgba(59,130,246,.4)",
              }}>Browse All Courses →</button>
            </div>
            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
              {["💬 Live AI Tutor","🎙️ Voice Chat","🔒 Secure Payment","♾️ Unlimited Questions","💵 $5/mo per course"].map(t=>(
                <span key={t} style={{color:"rgba(255,255,255,.55)",fontSize:13,fontWeight:600}}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </>}

      {/* ══════════════════════════════════════════════
         COURSES PAGE
      ══════════════════════════════════════════════ */}
      {section==="courses" && (
        <div style={{maxWidth:1400,margin:"0 auto",padding:"28px 16px 64px"}}>
          {/* Category cards */}
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,fontWeight:800,color:"#64748b",letterSpacing:"1.5px",
              textTransform:"uppercase",marginBottom:12}}>Browse by Category</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
              <button onClick={()=>{setCat("all");setPg(1);}} style={{
                padding:"9px 18px",borderRadius:20,fontFamily:"inherit",
                border:cat==="all"?"none":"1.5px solid #e2e8f0",
                background:cat==="all"?"#2563eb":"white",
                color:cat==="all"?"white":"#475569",fontWeight:800,fontSize:13,cursor:"pointer",
                boxShadow:cat==="all"?"0 4px 12px rgba(37,99,235,.35)":"none",
              }}>🌐 All ({ALL.length.toLocaleString()})</button>
              {CATS.map(c=>(
                <button key={c.id} onClick={()=>{setCat(c.id);setPg(1);}} style={{
                  padding:"9px 18px",borderRadius:20,fontFamily:"inherit",
                  border:cat===c.id?"none":"1.5px solid #e2e8f0",
                  background:cat===c.id?c.color:"white",
                  color:cat===c.id?"white":"#475569",fontWeight:800,fontSize:13,cursor:"pointer",
                  boxShadow:cat===c.id?`0 4px 12px ${c.color}44`:"none",
                  transition:"all .2s",
                }}>{c.icon} {c.label} ({counts[c.id]})</button>
              ))}
            </div>
          </div>

          {/* Category hero image if filtered */}
          {cat!=="all" && (()=>{
            const C=CATS.find(x=>x.id===cat);
            return (
              <div style={{borderRadius:20,overflow:"hidden",marginBottom:24,position:"relative",height:160}}>
                <img src={C.img} alt={C.label} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",inset:0,
                  background:`linear-gradient(135deg,${C.color}ee,${C.color}88)`}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 32px",gap:20}}>
                  <div style={{fontSize:52}}>{C.icon}</div>
                  <div>
                    <div style={{fontSize:26,fontWeight:900,color:"white"}}>{C.label}</div>
                    <div style={{color:"rgba(255,255,255,.85)",fontSize:15,marginTop:4}}>{C.desc}</div>
                  </div>
                  <div style={{marginLeft:"auto",background:"rgba(255,255,255,.2)",
                    border:"1.5px solid rgba(255,255,255,.35)",borderRadius:14,
                    padding:"12px 20px",color:"white",textAlign:"center"}}>
                    <div style={{fontSize:22,fontWeight:900}}>{counts[cat]}</div>
                    <div style={{fontSize:12,opacity:.8}}>Guides</div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Toolbar */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            marginBottom:20,flexWrap:"wrap",gap:10}}>
            <div style={{fontSize:17,fontWeight:800,color:"#0f172a"}}>
              <span style={{color:"#3b82f6"}}>{list.length.toLocaleString()}</span> courses found
              {q && <span style={{color:"#64748b",fontWeight:600,fontSize:14,marginLeft:8}}>for "{q}"</span>}
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:12,color:"#64748b",fontWeight:700}}>Sort:</span>
              {[{v:"default",l:"Default"},{v:"rating",l:"⭐ Top Rated"},{v:"pop",l:"🔥 Popular"},{v:"az",l:"A–Z"}].map(s=>(
                <button key={s.v} onClick={()=>setSort(s.v)} style={{
                  padding:"6px 13px",borderRadius:9,border:"1.5px solid",fontFamily:"inherit",
                  borderColor:sort===s.v?"#3b82f6":"#e2e8f0",
                  background:sort===s.v?"#eff6ff":"white",
                  color:sort===s.v?"#2563eb":"#64748b",
                  fontWeight:800,fontSize:12,cursor:"pointer",
                }}>{s.l}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {pageItems.length===0
            ? <div style={{textAlign:"center",padding:"80px 20px",color:"#94a3b8"}}>
                <div style={{fontSize:52,marginBottom:12}}>🔍</div>
                <div style={{fontSize:22,fontWeight:800,color:"#475569"}}>No courses found</div>
                <div style={{marginTop:8,fontSize:15}}>Try a different search or category</div>
              </div>
            : <div style={{display:"grid",
                gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
                {pageItems.map((c,i)=>(
                  <Card key={c.id} c={c} onBuy={setBuying} owned={owned.has(c.id)} delay={i*40} onTutor={setTutoring}/>
                ))}
              </div>
          }

          {/* Pagination */}
          {totalPg>1 && (
            <div style={{display:"flex",justifyContent:"center",gap:5,marginTop:40,flexWrap:"wrap"}}>
              <button disabled={pg===1} onClick={()=>setPg(p=>p-1)} style={PB(pg!==1)}>← Prev</button>
              {Array.from({length:Math.min(totalPg,10)},(_,i)=>{
                let p=i+1;
                if(totalPg>10){
                  if(pg<=5) p=i+1;
                  else if(pg>=totalPg-4) p=totalPg-9+i;
                  else p=pg-4+i;
                }
                return (
                  <button key={p} onClick={()=>setPg(p)} style={{
                    ...PB(true),
                    background:pg===p?"#2563eb":"white",
                    color:pg===p?"white":"#475569",
                    borderColor:pg===p?"#2563eb":"#e2e8f0",
                    fontWeight:pg===p?900:600,
                  }}>{p}</button>
                );
              })}
              <button disabled={pg===totalPg} onClick={()=>setPg(p=>p+1)} style={PB(pg!==totalPg)}>Next →</button>
            </div>
          )}
        </div>
      )}

      {/* Payment Modal */}
      {buying && (
        <PayModal c={buying} onClose={()=>setBuying(null)}/>
      )}

      {/* AI Tutor Modal */}
      {tutoring && (
        <TutorModal c={tutoring} onClose={()=>setTutoring(null)}/>
      )}

      {/* Post-checkout confirmation (after returning from Stripe) */}
      {subBanner && (
        <div onClick={e=>e.target===e.currentTarget&&setSubBanner(null)}
          style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",
            backdropFilter:"blur(6px)",display:"flex",alignItems:"center",
            justifyContent:"center",zIndex:1000,padding:16,animation:"fadeIn .2s ease"}}>
          <div style={{background:"white",borderRadius:22,width:"100%",maxWidth:400,
            padding:28,textAlign:"center",boxShadow:"0 40px 80px rgba(0,0,0,.3)",
            animation:"fadeUp .3s ease"}}>
            {subBanner.type==="success" ? <>
              <div style={{fontSize:54,marginBottom:10,animation:"pulse 1s ease 3"}}>🎉</div>
              <div style={{fontSize:22,fontWeight:900,color:"#16a34a",marginBottom:8}}>
                You're Subscribed!
              </div>
              <div style={{color:"#64748b",fontSize:14,marginBottom:22}}>
                $5/month for <strong>{subBanner.title}</strong> — chat live with your AI Tutor anytime.
              </div>
              <button onClick={()=>{setTutoring(subBanner.course);setSubBanner(null);}} style={{
                width:"100%",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
                color:"white",border:"none",borderRadius:12,padding:"13px",
                fontSize:15,fontWeight:800,cursor:"pointer",marginBottom:10,fontFamily:"inherit",
              }}>💬 Start Chatting with AI Tutor</button>
              <button onClick={()=>setSubBanner(null)} style={{
                background:"none",border:"none",color:"#94a3b8",cursor:"pointer",
                fontSize:13,fontFamily:"inherit",
              }}>Close</button>
            </> : <>
              <div style={{fontSize:44,marginBottom:10}}>⚠️</div>
              <div style={{fontSize:18,fontWeight:800,color:"#1e293b",marginBottom:8}}>
                Couldn't Confirm Subscription
              </div>
              <div style={{color:"#64748b",fontSize:13.5,lineHeight:1.6,marginBottom:22}}>
                {subBanner.message}
              </div>
              <button onClick={()=>setSubBanner(null)} style={{
                width:"100%",background:"#1e293b",color:"white",border:"none",
                borderRadius:12,padding:"13px",fontSize:15,fontWeight:800,
                cursor:"pointer",fontFamily:"inherit",
              }}>Close</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}

function PB(active){return{
  padding:"8px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",
  background:"white",color:active?"#475569":"#cbd5e1",
  fontWeight:600,fontSize:14,cursor:active?"pointer":"default",
  opacity:active?1:.5,fontFamily:"'Nunito',sans-serif",
};}
