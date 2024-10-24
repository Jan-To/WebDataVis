from sklearn.cluster import KMeans
from sklearn.datasets import load_iris
# access context from js
from js import n_clusters

X = load_iris().data
clustering = KMeans(n_clusters=n_clusters).fit(X)

results = {
    'data': X,
    'labels': clustering.labels_
}