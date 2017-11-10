import random
import string
from app import app
from model import project


def test_find_project():
    # p_id = random.randint(1, 100)
    p_id = 1;
    res = project.find_project(p_id)

    assert res['id'] == p_id

def test_update_project():
    p_name = ''.join(random.sample('abcdefghijklmnopqrstuvwxyz', 6))
    p_detail = ''.join(random.sample('abcdefghijklmnopqrstuvwxyz', 10))
    p_id = 1;
    res = project.update_project(p_id, {
        'name': p_name,
        'detail': p_detail
    })

    assert res['id'] == p_id and res['name'] == p_name and res['detail'] == p_detail

def test_find_project_users():
    p_id = 1;
    res = project.find_project_users(p_id)

    assert res[0]['projectId'] == p_id

def test_update_project_users():
    p_meb = random.sample('123456789', 3)
    print(p_meb)
    p_id = 1;
    res = project.update_project_users(p_id, {
        'memberIdArr': p_meb
    })

    assert res[0]['projectId'] == p_id and res[0]['memberId'] == int(p_meb[0])
