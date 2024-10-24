from sklearn.cluster import KMeans
from sklearn.datasets import load_iris
# access context from js
from js import n_clusters

print("starting python computations")
X = load_iris().data
try:
    clustering = KMeans(n_clusters=n_clusters).fit(X)
except Exception:
    print('Could not create clustering')
print('finished python computations')

results = {
    'data': X,
    'labels': clustering.labels_
}