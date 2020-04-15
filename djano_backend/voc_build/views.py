from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from .models import details
from .serializers import detailsSerializer
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET', 'POST'])
def snippet_list(request):
    if request.method == 'GET':
        snippets = details.objects.all()
        serializer = detailsSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = detailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def check(request,pk):
    try:
        snippet = details.objects.get(uname=pk)
    except details.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = detailsSerializer(snippet)
        return Response(serializer.data)

'''
class details_view(viewsets.ModelViewSet):
    queryset=details.objects.all()
    serializer_class=detailsSerializer
'''


'''
class details_view(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        self.object = self.get_object()
        try:
            return details.objects.get(id=pk)
        except details.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        self.object = self.get_object()
        snippet = details.get_object.all()
        serializer = detailsSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uname, format=None):
        self.object = self.get_object()
        snippet = details.get_object(uname)
        serializer = detailsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uname, format=None):
        self.object = self.get_object()
        snippet = details.get_object(uname)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
'''