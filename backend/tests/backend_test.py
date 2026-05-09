"""NOVACNKT Backend API tests"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://whiteboard-design.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Content endpoints
def test_services(client):
    r = client.get(f"{API}/services")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 6
    assert all("title" in s and "icon" in s and "blurb" in s and "color" in s for s in data)

def test_industries(client):
    r = client.get(f"{API}/industries")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 8
    for it in data:
        assert "id" in it and "name" in it and "icon" in it
        assert "tagline" in it and isinstance(it["tagline"], str) and it["tagline"]
        assert "image" in it and isinstance(it["image"], str) and it["image"].startswith("http")

def test_discounts(client):
    r = client.get(f"{API}/discounts")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 5
    for d in data:
        assert all(k in d for k in ["id", "code", "title", "description", "note", "accent"])

def test_testimonials(client):
    r = client.get(f"{API}/testimonials")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 3
    assert all(k in data[0] for k in ["name", "role", "quote", "avatar"])

def test_blogs(client):
    r = client.get(f"{API}/blogs")
    assert r.status_code == 200
    assert len(r.json()) == 3

def test_plans(client):
    r = client.get(f"{API}/plans")
    assert r.status_code == 200
    plans = r.json()
    assert len(plans) == 3
    tiers = [p["tier"] for p in plans]
    assert set(tiers) == {"Basic", "Standard", "Pro"}
    standard = next(p for p in plans if p["tier"] == "Standard")
    assert standard["highlighted"] is True
    basic = next(p for p in plans if p["tier"] == "Basic")
    assert basic["highlighted"] is False

def test_portfolio(client):
    r = client.get(f"{API}/portfolio")
    assert r.status_code == 200
    assert len(r.json()) == 9

def test_profile(client):
    r = client.get(f"{API}/profile")
    assert r.status_code == 200
    p = r.json()
    assert p["name"] and p["email"] and p["business"]


# Payments
def test_payment_invalid_plan(client):
    r = client.post(f"{API}/payments", json={"plan_id": "does-not-exist"})
    assert r.status_code == 404

def test_payment_valid_plan_then_listed(client):
    # Pick standard plan
    plans = client.get(f"{API}/plans").json()
    standard = next(p for p in plans if p["tier"] == "Standard")
    r = client.post(f"{API}/payments", json={"plan_id": standard["id"], "user_email": "TEST_buyer@example.com"})
    assert r.status_code == 200
    pay = r.json()
    assert pay["status"] == "succeeded"
    assert pay["amount"] == standard["price"]
    assert pay["plan_id"] == standard["id"]
    assert pay["id"]

    # List payments and verify it's in there
    r2 = client.get(f"{API}/payments")
    assert r2.status_code == 200
    ids = [x["id"] for x in r2.json()]
    assert pay["id"] in ids
