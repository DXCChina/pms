from hypothesis import given, example
from hypothesis.strategies import tuples, booleans, lists, text, integers
from app import app
from model import user


def test_get_user():
    tester = app.test_client()
    response = tester.get('/api/user')
    assert response.data == b'{\n  "msg": "Missing JWT in headers and cookies"\n}\n'


@given(integers(), integers())
@example(1, 2)
def test_find_one_by_user(x, y):
    assert user.findOneByName('test')['username'] == 'test'
