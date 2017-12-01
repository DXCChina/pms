import graphene
class Query(graphene.ObjectType):
    hello = graphene.String(description='A typical hello world')

    def resolve_hello(self, info):
        print(info,'###############################')
        return 'World'

schema = graphene.Schema(query=Query)