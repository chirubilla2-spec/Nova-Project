from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="NOVACNKT Business Vertical API")
api_router = APIRouter(prefix="/api")


# --------- Models ----------
class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    icon: str
    blurb: str
    color: str

class Industry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    icon: str
    tagline: str = ""
    image: str = ""

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    quote: str
    avatar: str

class Blog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    tag: str
    cover: str

class Plan(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    tier: str
    price: float
    features: List[str]
    highlighted: bool = False

class PortfolioItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    cover: str

class Discount(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    code: str
    title: str
    description: str
    note: str
    accent: str

class Profile(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "novacnkt-user"
    name: str
    handle: str
    email: str
    avatar: str
    business: str
    verified: bool

class PaymentRequest(BaseModel):
    plan_id: str
    user_email: Optional[str] = None

class PaymentResponse(BaseModel):
    id: str
    plan_id: str
    amount: float
    status: str
    created_at: str


# --------- Seed Data ----------
SEED_SERVICES = [
    {"id": "s1", "title": "Brand Identity", "icon": "sparkles", "blurb": "Logos, colors, voice", "color": "#F4B8A8"},
    {"id": "s2", "title": "Web Design", "icon": "monitor", "blurb": "Landing pages & sites", "color": "#FFD1B8"},
    {"id": "s3", "title": "Mobile Apps", "icon": "smartphone", "blurb": "iOS & Android UX", "color": "#F4B8A8"},
    {"id": "s4", "title": "Marketing", "icon": "megaphone", "blurb": "Performance growth", "color": "#FFE0CC"},
    {"id": "s5", "title": "AI Studio", "icon": "wand-2", "blurb": "Custom AI tools", "color": "#F4B8A8"},
    {"id": "s6", "title": "Strategy", "icon": "compass", "blurb": "Roadmaps & vision", "color": "#FFD1B8"},
]

SEED_INDUSTRIES = [
    {"id": "i1", "name": "Manufacturing", "icon": "factory", "tagline": "Get More Leads", "image": "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600"},
    {"id": "i2", "name": "Retail", "icon": "shopping-bag", "tagline": "Connect with B2C Audience", "image": "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=600"},
    {"id": "i3", "name": "Financial Services", "icon": "trending-up", "tagline": "Build Trust. Automate Growth.", "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600"},
    {"id": "i4", "name": "E-commerce", "icon": "shopping-cart", "tagline": "Convert Faster", "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"},
    {"id": "i5", "name": "Real Estate", "icon": "building-2", "tagline": "Digitize. Engage. Close.", "image": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600"},
    {"id": "i6", "name": "SaaS", "icon": "monitor", "tagline": "Ship Faster. Retain Longer.", "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"},
    {"id": "i7", "name": "Healthcare", "icon": "heart-pulse", "tagline": "Care, Made Smarter.", "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600"},
    {"id": "i8", "name": "Education", "icon": "graduation-cap", "tagline": "Teach. Track. Transform.", "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"},
]

SEED_TESTIMONIALS = [
    {"id": "t1", "name": "Aarav Sharma", "role": "Founder, Lumen", "quote": "NOVA scaled our brand 3x in a quarter. Surreal team.", "avatar": "https://i.pravatar.cc/120?img=12"},
    {"id": "t2", "name": "Priya Mehta", "role": "CMO, Curate", "quote": "Their AI-led approach is years ahead. Worth every rupee.", "avatar": "https://i.pravatar.cc/120?img=32"},
    {"id": "t3", "name": "Rohan Khanna", "role": "CEO, Northpeak", "quote": "Beautiful work, ruthless about results.", "avatar": "https://i.pravatar.cc/120?img=15"},
]

SEED_BLOGS = [
    {"id": "b1", "title": "Why AI-first wins in 2026", "excerpt": "A field guide to building leverage with intelligent products.", "tag": "Insight", "cover": "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=600"},
    {"id": "b2", "title": "Brand systems that scale", "excerpt": "How we structure identity for fast-moving teams.", "tag": "Case Study", "cover": "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=600"},
    {"id": "b3", "title": "From idea to launch in 30 days", "excerpt": "The NOVA sprint methodology breakdown.", "tag": "Playbook", "cover": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600"},
]

SEED_PLANS = [
    {"id": "p1", "tier": "Basic", "price": 49.0, "features": ["1 brand kit", "5 design requests", "Email support"], "highlighted": False},
    {"id": "p2", "tier": "Standard", "price": 149.0, "features": ["Unlimited requests", "Brand + Web", "Priority support", "AI assistant"], "highlighted": True},
    {"id": "p3", "tier": "Pro", "price": 399.0, "features": ["Dedicated team", "Strategy calls", "Quarterly review", "Roadmap access"], "highlighted": False},
]

SEED_PORTFOLIO = [
    {"id": "pf1", "title": "Lumen App", "category": "Mobile", "cover": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400"},
    {"id": "pf2", "title": "Curate Web", "category": "Website", "cover": "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400"},
    {"id": "pf3", "title": "Northpeak ID", "category": "Branding", "cover": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400"},
    {"id": "pf4", "title": "Atlas Dash", "category": "SaaS", "cover": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400"},
    {"id": "pf5", "title": "Verve Print", "category": "Print", "cover": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400"},
    {"id": "pf6", "title": "Quill AI", "category": "AI Tool", "cover": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400"},
    {"id": "pf7", "title": "Pulse Mobile", "category": "Mobile", "cover": "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400"},
    {"id": "pf8", "title": "Forge Site", "category": "Website", "cover": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400"},
    {"id": "pf9", "title": "Halo Mark", "category": "Branding", "cover": "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400"},
]

SEED_PROFILE = {
    "id": "novacnkt-user",
    "name": "Aanya Kapoor",
    "handle": "@aanya.k",
    "email": "aanya@novacnkt.com",
    "avatar": "https://i.pravatar.cc/200?img=47",
    "business": "Kapoor Studios LLP",
    "verified": True,
}

SEED_DISCOUNTS = [
    {"id": "d1", "code": "FLASH125", "title": "Get upto 125 off on spends above Rs.2000", "description": "Get upto ₹125 off on spends above ₹2000", "note": "Applicable for one time", "accent": "lime"},
    {"id": "d2", "code": "NOVA50", "title": "Flat 50% off on Standard plan", "description": "Lock in NOVA Standard for half the price.", "note": "Limited time · ends Sunday", "accent": "violet"},
    {"id": "d3", "code": "FIRSTBRAND", "title": "Free brand audit on first invoice", "description": "Audit + roadmap delivered in 48 hours.", "note": "New customers only", "accent": "lime"},
    {"id": "d4", "code": "REFER300", "title": "₹300 credits per successful referral", "description": "Refer a founder, both of you earn.", "note": "Stackable up to 5×", "accent": "amber"},
    {"id": "d5", "code": "AI100", "title": "100 AI Studio credits free", "description": "Try the NOVA AI Studio for a month, on us.", "note": "One redemption per workspace", "accent": "violet"},
]


# --------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "NOVACNKT Business Vertical", "version": "1.0"}

@api_router.get("/services", response_model=List[Service])
async def get_services():
    return SEED_SERVICES

@api_router.get("/industries", response_model=List[Industry])
async def get_industries():
    return SEED_INDUSTRIES

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    return SEED_TESTIMONIALS

@api_router.get("/blogs", response_model=List[Blog])
async def get_blogs():
    return SEED_BLOGS

@api_router.get("/plans", response_model=List[Plan])
async def get_plans():
    return SEED_PLANS

@api_router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio():
    return SEED_PORTFOLIO

@api_router.get("/profile", response_model=Profile)
async def get_profile():
    return SEED_PROFILE

@api_router.get("/discounts", response_model=List[Discount])
async def get_discounts():
    return SEED_DISCOUNTS

@api_router.post("/payments", response_model=PaymentResponse)
async def create_payment(req: PaymentRequest):
    plan = next((p for p in SEED_PLANS if p["id"] == req.plan_id), None)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    payment = {
        "id": str(uuid.uuid4()),
        "plan_id": plan["id"],
        "amount": plan["price"],
        "status": "succeeded",
        "user_email": req.user_email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.payments.insert_one(payment.copy())
    return PaymentResponse(
        id=payment["id"],
        plan_id=payment["plan_id"],
        amount=payment["amount"],
        status=payment["status"],
        created_at=payment["created_at"],
    )

@api_router.get("/payments", response_model=List[PaymentResponse])
async def list_payments():
    rows = await db.payments.find({}, {"_id": 0}).to_list(100)
    return [PaymentResponse(**r) for r in rows]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
